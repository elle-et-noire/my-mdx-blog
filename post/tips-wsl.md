---
title: Tips for WSL
publish: 2024-12-19
lastUpdate: 2025-02-05
tags:
- terminal
---

いくつかはWSLに特有であり、いくつかは普遍的にLinuxで使える。

## npmパッケージアップデート

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

PDFをターミナルから確認したくなったとき、WSLならWindowsのPDFビューワーを起動するという選択肢がある。SumatraPDFならPDFの変更を検知してくれるため、TeXなどで資料を作る際の見た目の確認が容易である。以下の文言を起動時に読み込まれるファイル（`.bashrc`とか`.zshrc`とか）に書いておくと便利。
```sh
alias sumatra="/mnt/c/Users/lomega/AppData/Local/SumatraPDF/SumatraPDF.exe"
```

## SSH接続でXを転送する

- sshのconfigで`ForwardX11 yes`を設定する
- 接続時にX転送を許可する: `ssh -X uouo`

のいずれかを行う（[参考](https://kazuhira-r.hatenablog.com/entry/2021/01/14/234921)）。前者を設定しておく方が便利。

なお、手元の環境では、WSLからSSH接続する分には`ForwardX11 yes`だけで十分だが、Windows TerminalからSSH接続する際には加えて`ForwardX11Trusted yes`も設定する必要があった（[参考](https://obel.hatenablog.jp/entry/20230207/1675713600)）。これを設定しておいてWindows Terminal上で`code --folder-uri vscode-remote://ssh-remote+uouo/home/lomega/`のように接続すると、VSCodeをRemote SSH経由で起動でき、ターミナルでX11を利用した操作（主にgnuplot）も可能となる。


## 解凍

`tar.gz`ファイルを解凍する場合：
```sh
tar -zxvf xxxx.tar.gz
```

[参考](https://qiita.com/supersaiakujin/items/c6b54e9add21d375161f)


## カーネルのバージョン確認

[参考](https://qiita.com/h_tyokinuhata/items/0683e0132645bc36d9d3)

`uname`(unix name?)コマンドでハードウェア、カーネル、OSの情報を得られる。
```sh
uname -a
```

OSの情報を詳しく確認するには`/etc/os-release`を確認する。
```sh
cat /etc/os-release
```
