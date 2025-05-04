---
title: 仕様確認
publish: 2025-05-05
lastUpdate: 2025-05-05
tags:
- md
- next
---

# 見出し

```
# 見出し
## 見出し2
### 見出し3
#### 見出し4
見出し
=
見出し2
---
```


# リスト

```markdown
- Hello!
- Hola!
  - Bonjour!
  * Hi!
    - 3rd
```

- Hello!
- Hola!
  - Bonjour!
  * Hi!
    - 3rd

## 番号付きリスト
```markdown
1. First
1. Second
   1. うお

1986\. What a great season. ← olキャンセル
```
1. First
1. Second
   1. うお

1986\. What a great season. ← olキャンセル

# テキストリンク
```markdown
[ZennのMarkdown記法一覧](https://zenn.dev/zenn/articles/markdown-guide)
[Markdown文法まとめ](https://qiita.com/higuma/items/3344387e0f2cce7f2cfe "よくまとまっている")
Markdown記法：[「みんな抱きしめて、銀河の果てまで！」は何がすごいのか](/2022/02/embrace-me/)
`#a`を指定：[ローレンツ不変な体積要素](/2022/01/lorentz-invar-element#a)
`#blank`を指定：[ローレンツ不変な体積要素](/2022/01/lorentz-invar-element#blank)
```

[ZennのMarkdown記法一覧](https://zenn.dev/zenn/articles/markdown-guide)
[Markdown文法まとめ](https://qiita.com/higuma/items/3344387e0f2cce7f2cfe "よくまとまっている")
Markdown記法：[「みんな抱きしめて、銀河の果てまで！」は何がすごいのか](/2022/02/embrace-me/)
`#a`を指定：[ローレンツ不変な体積要素](/2022/01/lorentz-invar-element#a)
`#blank`を指定：[ローレンツ不変な体積要素](/2022/01/lorentz-invar-element#blank)


# 画像
```markdown
![altテキスト](https://画像のURL)
![altテキスト](/images/画像のURL)
```
![C.C.png](https://pbs.twimg.com/media/EXpim-pUcAASSlH?format=png&name=900x900 "Do you know, C.C.?")


## 画像にリンクを貼る
```markdown
[![altテキスト](画像のURL)](リンクのURL)
```
[![C.C. knows](https://pbs.twimg.com/media/D6lyI11UwAARUXm?format=png&name=small)](https://pbs.twimg.com/media/D6lyI11UwAARUXm?format=png&name=small)


# テーブル
```markdown
| Head | Head | Head |
| ---- | ---- | ---- |
| Text | Text | Text |
| Text | Text | Text |

| Left align | Right align | Center align |
|:-----------|------------:|:------------:|
| Left       | Right       | Center       |
```

| Head | Head | Head |
| ---- | ---- | ---- |
| Text | Text | Text |
| Text | Text | Text |

| Left align | Right align | Center align |
|:-----------|------------:|:------------:|
| Left       | Right       | Center       |

# コードブロック

## ファイル名を表示する

````markdown
```js:ファイル名
内容
```
````

```js:fooBar.js
const great = () => {
  console.log("Awesome");
};
```

## diffのシンタックスハイライト

````markdown
```diff js:ファイル名
内容
```
````

```diff js
@@ -4,6 +4,5 @@
+  const foo = bar.baz([1, 2, 3]) + 1;
-  let foo = bar.baz([1, 2, 3]);
+  const foo = bar.baz([1, 2, 3]) + 1;
-  let foo = bar.baz([1, 2, 3]);
   uouo;
   uouo;
```


```diff js:fooBar.js
@@ -4,6 +4,5 @@
+    const foo = bar.baz([1, 2, 3]) + 1;
-    let foo = bar.baz([1, 2, 3]);
```

## コードの言語を指定しないとなぜか文字化けする

```js
   return shell_exec("echo input | markdown_script");
```
```
   return shell_exec("echo input | markdown_script");
```

```latex
Campbell-Baker-Hausdorff の公式は，演算子 $\hat{A},\hat{B}$ を用いて次のように書ける：
\begin{equation}
e^{\hat{A}}\hat{B}e^{-\hat{A}}=\hat{B}+[\hat{A},\hat{B}]+\frac{1}{2}[\hat{A},[\hat{A},\hat{B}]]+\cdots.\label{eq1}
\end{equation}

式\eqref{eq1}を用いて，演算子 $\hat{V}$ の相互作用表示は次のように書くことができる．
```



# 数式

$$
e^{i\theta} = \cos\theta + i\sin\theta\\
=\operatorname{cis}\theta
$$

のように数式を書ける。


インラインでも$a=0$のように書ける。
* うおお。$a=0$。
* うおおお$a=0$。

を見比べると、全角文字などで空いているように見える場合は文中数式のスペースは詰められる。また$r$-単体のようにハイフンの前後でもスペースは詰められる。それ以外でスペースを詰めたい場合は$\hspace{-0.2em}a=0$のように手動で詰められる。

- `\mqty()`, `\mqty[]` など：行列が書けます．列は `&` で，行は `\\` で区切ります．$\mqty(0&1\\2&0)$

- `\dmat{}`, `\dmat[]{}`：対角行列を出してくれます．`\dmat[0]{a}` のように `0` を渡せば，ゼロで埋めてくれます．$\mqty[\dmat{1,-1}]$

```latex
\[
\mqty[0&1\\2&0],\quad
\mqty[\dmat{1,-1}],\quad
\mqty[\dmat[0]{1,-1}]
\]
```

# 引用

> 引用文
>> 引用文

ネスト出来る。

> More is different.
>
>    P. W. Anderson

空行は無視されないが冒頭のスペースは無視される。

> ## This is a header.
>
> 1. This is the first list item.
> 2. This is the second list item.
>
> Here's some example code:
> ```
>   return shell_exec("echo $input | $markdown_script");
> ```



# 区切り線

```markdown
---
```

---

# インラインスタイル

```markdown
*イタリック*
**太字**
~~打ち消し線~~
インラインで`code`を挿入する。``files = `ls`.split``とか`` `ps` ``とか。
```
*イタリック*
**太字**
~~打ち消し線~~
インラインで`code`を挿入する。``files = `ls`.split``とか`` `ps` ``とか。

# インラインのコメント
```markdown
<!-- TODO: ◯◯について追記する -->
```
<!-- TODO: ◯◯について追記する -->

# チェックボックス
```markdown
- [ ] タスク1
- [x] タスク2
```

- [ ] タスク1
- [x] タスク2

