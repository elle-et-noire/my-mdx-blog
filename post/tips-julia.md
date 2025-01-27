---
title: Tips for Julia
publish: 2025-01-01
lastUpdate: 2025-01-27
---

## 構文解析

正体が分からない記号が使われているとき、`Meta.@lower`を使えば実際に呼び出される関数や行われる処理が分かる。演算子をオーバーロードしたいときに役に立つ。

```julia
julia> Meta.@lower [1,2][[1,2]]
:($(Expr(:thunk, CodeInfo(
    @ none within `top-level scope`
1 ─ %1 = Base.vect(1, 2)
│   %2 = Base.vect(1, 2)
│   %3 = Base.getindex(%1, %2)
└──      return %3
))))
```

```julia
julia> Meta.@lower [1,2][1] = 2
:($(Expr(:thunk, CodeInfo(
    @ none within `top-level scope`
1 ─ %1 = Base.vect(1, 2)
│        Base.setindex!(%1, 2, 1)
└──      return 2
))))
```

配列の要素取得は`getindex`を、代入は`setindex!`をオーバーロードすればよいと分かる。

`@which`でもその記号が呼び出している関数名を教えてくれるが、具体的にどう用いられているかは`Meta.@lower`を見る方が分かりやすい。


## Dictのブロードキャスト

`Vector`ならスライスで`v[1:3]`のように部分列を取り出せる。Dictで同じように書くと`1:3`がkeyだと思われてしまってうまくいかない。Dictではブロードキャストを利用して同じことができる（[参考](https://discourse.julialang.org/t/how-to-get-values-of-dictionary-by-using-array-of-keys/73650/11)）。

```julia
d = Dict(:a=>1,:b=>2)
v = get.(Ref(d), [:a,:b], missing)
@assert v == [1, 2]
```


## 置換群

配列`s=[1,3,2]`は作用`v -> v[s]`によって置換と見なせる。特に`v`もまた`[1,2,3]`の並べ替えなら（つまり`isperm(v)`かつ`length(v)==3`なら）、`v[s]`は置換群の積になる。逆元は`invperm`あるいは`sortperm`で得られる。積の結合律が成り立つことは、3次の置換群に限れば以下のコードで証明できる。

```julia
perms(l) = isempty(l) ? [l] : [[x; y] for x in l for y in perms(setdiff(l, x))]

begin
  perm123 = perms([1, 2, 3])
  for (p, q, r) in Iterators.product(fill(perm123, 3)...)
    @assert p[q[r]] == p[q][r]
  end
end
```

順列を生成する関数`perms`の出典は[ここ](https://zenn.dev/ohno/articles/03e65bfa028baa)あるいは[ここ](https://rosettacode.org/wiki/Permutations#Julia)。


## 引数の分解

引数に渡されるTupleやPairやVectorを分解して受け取ることができる。

```julia
d((a, b)::Tuple) = a / b
d((a, b)::Pair) = b / a
d((a, b)) = a // b
@assert d((5, 2)) == 2.5
@assert d(5 => 2) == 0.4
@assert d([5, 2]) == 5//2
```

無名関数で引数を分解するときは`((a, b),) -> a / b`のように`,`を入れる（か引数の組の型を明示する）。


## 高次元配列の生成

for文でイテレータを複数書けばそれらはより高次の`axes`を走る。
またブロードキャストも引数の`AbstractArray`の`axes`の方向に準拠する。

```julia
v = [i * j for i in 1:3, j in 1:3]
@assert v == [1 2 3; 2 4 6; 3 6 9]
v = (1:3) .* (1:3)'
@assert v == [1 2 3; 2 4 6; 3 6 9]
```
2つ目の例では`.`なしでも行列のかけ算と見なされて同じ結果になる。


高階のKronecker delta \(\delta_{i_1\dots i_n}\ (i_j \in \{1,\dots,d_j\})\)は以下のように生成できる。

```julia
dims = [2, 4, 2, 4]
map(t -> Int(all(==(t[1]), t)),
    Iterators.product(Base.OneTo.(dims)...))
```

## 同値類への分割

[Juliaで集合を同値類に分割する](https://zenn.dev/ohno/articles/b83defa73d7e7c)という記事に触発されて実装してみた。`R`を呼び出す回数をなるべく減らしてある。

```julia
function classify(S, R)
  isempty(S) && return ([], [])
  indices = zeros(Int, length(S))
  j = 1
  while !isnothing(j)
    indices[j] = j
    Rj = filter(k -> indices[k] == 0 && R(S[j], S[k]), j+1:lastindex(S))
    indices[Rj] .= j
    j = findnext(iszero, indices, j + 1)
  end
  reprinds = unique(indices)
  [S[filter(j -> indices[j] == r, eachindex(S))] for r in reprinds], S[reprinds]
end

begin
  A = [1, 7, 3, 6, 10, 9]
  f(i, j) = iseven(i) == iseven(j)
  @assert classify(A, f) == ([[1, 7, 3, 9], [6, 10]], [1, 6])
end
```

`Set`や`unique`といった重複を取り除く関数も用意されているが、これらを同値類への分割に利用するには、商の型を用意してその上への`hash`を定義するか、元の型に対して`isequal`をオーバーロードするかしなければいけない（`isequal`をオーバーロードしたら`hash`もオーバーロードする必要がある[らしい](https://zenn.dev/kurusugawa/articles/hash_on_julia)）。`sort`関数が`lt`や`by`をで比較関数やハッシュ関数を設定できるのとは大違いである。`hash`や`isequal`を引数で受け取って同値類へ分割するには以下のようにする。

```julia
function classify(S; hash=identity, isequal=isequal)
  isempty(S) && return ([], [])
  indices = zeros(Int, length(S))
  reprs = hash.(S)
  j = 1
  while !isnothing(j)
    indices[j] = j
    Rj = filter(k -> iszero(indices[k]) && isequal(reprs[j], reprs[k]), j+1:lastindex(S))
    indices[Rj] .= j
    j = findnext(iszero, indices, j + 1)
  end
  reprinds = unique(indices)
  [S[filter(j -> indices[j] == r, eachindex(S))] for r in reprinds], S[reprinds]
end

begin
  A = [1, 7, 3, 6, 10, 9]
  @assert classify(A; hash=iseven) == ([[1, 7, 3, 9], [6, 10]], [1, 6])
end
```

## SVGの生成

[BenLauwens/NativeSVG.jl](https://github.com/BenLauwens/NativeSVG.jl)を用いる。

## Eratosthenesの篩

特に工夫をしなければ以下のような実装になるはず。`m`が`p^2`から動き始めるのは、`p^2`より小さい合成数は`p`より小さい素数ですでに割られているはずだからである。

```julia
function sieve(x)
  flags = fill(true, x)
  flags[1] = false
  sqrtx = floor(Int, sqrt(x))
  for p in 2:sqrtx
    !flags[p] && continue
    for m in p^2:p:x
      flags[m] = false
    end
  end
  findall(flags)
end

begin
  @assert sieve(10) == [2, 3, 5, 7]
end
```

2の倍数判定を省略すると以下のようになる。`flags[j]`に`2j+1`が素数かどうかのフラグが格納されている。`(2j+1)^2 == 2(2j*(j+1)) + 1`なので、`m`は`2j*(j+1)`から動き始める。

```julia
function sieve1(x)
  flags = fill(true, (x - 1) ÷ 2)
  sqrtx = floor(Int, sqrt(x))
  for j in 1:sqrtx÷2
    !flags[j] && continue
    for m in (2j*(j+1)):(2j+1):lastindex(flags)
      flags[m] = false
    end
  end
  v = 2findall(flags) .+ 1
  pushfirst!(v, 2)
end
```

2,3,5の倍数まであらかじめ除いておくと、30でわった余りが1,7,11,13,17,19,23,29のものだけ気にすればよい（[参考](https://qiita.com/peria/items/54499b9ce9d5c1e93e5a)）。
```julia
function bit_to_index(b)
  dict = Dict([1 << j => j for j in 0:7]...)
  get(dict, b, -1)
end

function sieve2(x)
  k_mod30 = [1, 7, 11, 13, 17, 19, 23, 29]
  c1 = [6, 4, 2, 4, 2, 4, 6, 2]
  c0 = [
    [0, 0, 0, 0, 0, 0, 0, 1], [1, 1, 1, 0, 1, 1, 1, 1],
    [2, 2, 0, 2, 0, 2, 2, 1], [3, 1, 1, 2, 1, 1, 3, 1],
    [3, 3, 1, 2, 1, 3, 3, 1], [4, 2, 2, 2, 2, 2, 4, 1],
    [5, 3, 1, 4, 1, 3, 5, 1], [6, 4, 2, 4, 2, 4, 6, 1],
  ]
  k_mask = [
    [0xfe, 0xfd, 0xfb, 0xf7, 0xef, 0xdf, 0xbf, 0x7f],
    [0xfd, 0xdf, 0xef, 0xfe, 0x7f, 0xf7, 0xfb, 0xbf],
    [0xfb, 0xef, 0xfe, 0xbf, 0xfd, 0x7f, 0xf7, 0xdf],
    [0xf7, 0xfe, 0xbf, 0xdf, 0xfb, 0xfd, 0x7f, 0xef],
    [0xef, 0x7f, 0xfd, 0xfb, 0xdf, 0xbf, 0xfe, 0xf7],
    [0xdf, 0xf7, 0x7f, 0xfd, 0xbf, 0xfe, 0xef, 0xfb],
    [0xbf, 0xfb, 0xf7, 0x7f, 0xfe, 0xef, 0xdf, 0xfd],
    [0x7f, 0xbf, 0xdf, 0xef, 0xf7, 0xfb, 0xfd, 0xfe],
  ]
  x > 10000000000 && return

  r = x % 30
  size = x ÷ 30 + (r != 0)
  flags = fill(0xff, size)
  if r != 0
    for j in eachindex(k_mod30)
      if r <= k_mod30[j]
        flags[end] = UInt8((1 << (j - 1)) - 1)
        break
      end
    end
  end

  flags[1] = 0xfe
  sqrt_x = ceil(Int, sqrt(x) + 0.1)
  sqrt_xi = sqrt_x ÷ 30 + 1
  for i in 0:sqrt_xi-1
    flag = flags[i+1]
    while flag != 0
      lsb = flag & (-flag) # extract the right-most 1 in flag
      ibit = bit_to_index(lsb)
      m = k_mod30[ibit+1]

      j = i * (30i + 2m) + m^2 ÷ 30
      k = ibit
      while j < length(flags)
        flags[j+1] &= k_mask[ibit+1][k+1]

        j += i * c1[k+1] + c0[ibit+1][k+1]
        k = (k + 1) & 7
      end

      flag &= flag - 1 # eliminate the right-most 1 in flag
    end
  end

  primes = [2, 3, 5]
  for j in eachindex(flags), k in eachindex(k_mod30)
    if flags[j] & (1 << (k - 1)) != 0
      push!(primes, 30(j - 1) + k_mod30[k])
    end
  end
  primes
end
```