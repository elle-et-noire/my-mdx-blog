---
title: Node.jsで開発する際に知っておくと便利な知識
publish: 2024-12-19
lastUpdate: 2024-12-19
tags:
- nodejs
- web
- terminal
---

## パッケージアップデート

[参考](https://qiita.com/sugurutakahashi12345/items/df736ddaf65c244e1b4f)

```sh
npx -p npm-check-updates -c "ncu" # check updates
npx -p npm-check-updates -c "ncu -u" # update package.json
npm i
```

## サーバーを立てる/切る

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
で切る。

立てたプロセスとは違うプロセスでサーバーが動いている場合もある。Next.jsの場合は`next-server (v15.1.1)`のような名前のプロセスを切る。