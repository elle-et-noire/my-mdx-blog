---
title: Node.js開発Tips
publish: 2024-12-19
lastUpdate: 2025-01-22
tags:
- nodejs
- web
- terminal
---

## パッケージアップデート

[参考](https://qiita.com/sugurutakahashi12345/items/df736ddaf65c244e1b4f)

```sh
npx -p npm-check-updates -c "ncu" # check for updates
npx -p npm-check-updates -c "ncu -u" # update package.json
npm i
```

## サーバーを立てる / 切る

```sh
npm run dev &
```
とすることでサーバーを立てたまま作業できる。

サーバーを切る際には
```sh
ps aux | grep next
```
から該当のプロセスを探して
```sh
kill -9 000000
```
で切る。プロセス名が分かっている場合は`pkill`を用いる。

立てたプロセスとは違うプロセスでサーバーが動いている場合もある。Next.jsの場合は`next-server (v15.1.1)`のような名前のプロセスを切る。


## 直前のフォルダへ移動

直前のフォルダへ戻るだけなら以下のコマンドが簡単。
```sh
cd -
```
文字通り直前のフォルダへ戻る。つまりこの操作は対合である。

`alias`コマンドでエイリアスに`-=cd -`などと登録されていることが確認できる場合は`-`だけでよい。

2つ以上前へ戻るには`cd -2`としたり`popd`を用いたりする。


## 作ったフォルダへ移動

```sh
mkdir uouo
cd $_
```
で`uouo`へ移動できる。フォルダ名が特殊文字を含む場合は`cd "$_"`とする。

## 画像の確認

ターミナルで作業していて画像を確認したくなった際は[sxiv](https://manpages.ubuntu.com/manpages/xenial/man1/sxiv.1.html)を用いる。
```sh
sudo apt install sxiv
sxiv uo.png
```

## SSH接続でXを転送する

- sshのconfigで`ForwardX11 yes`を設定する
- 接続時にX転送を許可する: `ssh -X uouo`

のいずれかを行う（[参考](https://kazuhira-r.hatenablog.com/entry/2021/01/14/234921)）。