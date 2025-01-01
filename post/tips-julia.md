---
title: Tips for Julia
publish: 2025-01-01
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


## Dictのブロードキャスト

`Vector`ならスライスで`v[1:3]`のように部分列を取り出せる。Dictで同じように書くと`1:3`がkeyだと思われてしまってうまくいかない。Dictではブロードキャストを利用して同じことができる（[参考](https://discourse.julialang.org/t/how-to-get-values-of-dictionary-by-using-array-of-keys/73650/11)）。

```julia
d = Dict(:a=>1,:b=>2)
v = get.(Ref(d), [:a,:b], missing)
@assert v == [1, 2]
```


## 置換群

配列`s=[1,3,2]`は作用`v -> v[s]`によって置換と見なせる。特に`v`もまた`[1,2,3]`の並べ替えなら、`v[s]`は置換群の積になる。逆元は`invperm`で得られる。積の結合律が成り立つことは、3次の置換群に限れば以下のコードで証明できる。

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