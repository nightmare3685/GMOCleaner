<div align="center">

# GMOCleaner

**天秤AIの画面を、もっとすっきり。**

ヘッダー・フッターを取り除き、ワークスペースの表示を調整する小さなスクリプトです。

![Target: Tenbin AI](https://img.shields.io/badge/Target-tenbin.ai-2563EB?style=flat-square)
![Bookmarklet](https://img.shields.io/badge/Bookmarklet-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Tampermonkey](https://img.shields.io/badge/Userscript-Tampermonkey-00485B?style=flat-square)

[ブックマークレット](#ブックマークレットで使う) · [Tampermonkey](#tampermonkeyで使う) · [元に戻す](#元の表示に戻す) · [困ったとき](#困ったとき)

</div>

---

## できること

[天秤AI](https://tenbin.ai/)の画面から、次の要素を削除します。

| 対象 | セレクター |
| --- | --- |
| ページのフッター | `.p-Footer` |
| GMOグループのフッター | `.gmoGroupFooter` |
| GMOグループのヘッダー | `.gmoGroupHeader` |

あわせて、ページ全体のスクロールを無効にし、本文の上マージンを `-28px` に設定します。変更はブラウザーで開いているページに適用されます。

> GMO・天秤AIの公式ツールではありません。サイトの構造や画面サイズによって、表示結果は変わる場合があります。

## 使い方を選ぶ

| | ブックマークレット | Tampermonkey |
| --- | --- | --- |
| 向いている使い方 | 必要なときだけ整えたい | 対象ページで自動的に整えたい |
| 拡張機能 | 不要 | Tampermonkeyが必要 |
| 実行のタイミング | ブックマークをクリックしたとき | 対象ページの読み込み・DOMの変化時 |
| 後から追加されるUI | もう一度クリック | DOMの変化を監視して再処理 |
| ソース | [`Bookmark.js`](Bookmark.js) | [`normal.js`](normal.js) |

どちらか一方を選んで使えます。

## ブックマークレットで使う

1. ブラウザーでブックマークを作成します。
2. 名前を **GMOCleaner** などに変更します。
3. ブックマークの **URL欄** を、次のコード全体に置き換えて保存します。
4. 天秤AIのワークスペースを開き、保存したブックマークをクリックします。

```javascript
javascript:(function(){const s=['.p-Footer','.gmoGroupFooter','.gmoGroupHeader'];document.querySelectorAll(s.join(',')).forEach(el=>el.remove());document.documentElement.style.overflow='hidden';document.body.style.overflow='hidden';document.body.style.marginTop='-28px';})();
```

先頭の `javascript:` も含めて登録してください。アドレスバーへの貼り付けではなく、ブックマークの編集画面でURLを設定します。

ブックマークレットには実行先URLの制限がありません。天秤AIの対象画面を開いてから使ってください。ページを再読み込みした場合や、削除したUIが再表示された場合は、もう一度クリックします。

## Tampermonkeyで使う

1. [Tampermonkey公式サイト](https://www.tampermonkey.net/)から、お使いのブラウザー用の拡張機能を導入します。
2. Tampermonkeyのメニューから **新規スクリプトを追加** を選びます。
3. エディターに最初からある内容を消し、[`normal.js` の全文](https://raw.githubusercontent.com/nightmare3685/GMOCleaner/main/normal.js)を貼り付けます。
4. 保存し、スクリプトが有効になっていることを確認します。
5. 天秤AIのワークスペースを開き直すか、再読み込みします。

現在のスクリプト名は **「クリーンアップ」** です。Tampermonkeyの一覧では、この名前で表示されます。

自動実行の対象URLは次のとおりです。

```text
https://tenbin.ai/workspace*
```

スクリプトは `MutationObserver` でページ内の要素の追加・削除を監視し、対象UIを再び削除します。ブラウザー側でユーザースクリプトの実行許可を求められる場合は、[Tampermonkey公式FAQ](https://www.tampermonkey.net/faq.php#Q209)を参照してください。

## 元の表示に戻す

- **ブックマークレット版**：ページを再読み込みします。
- **Tampermonkey版**：Tampermonkeyで「クリーンアップ」を無効にしてから、ページを再読み込みします。

Tampermonkey版は、無効にするだけではすでに削除した要素を復元しません。再読み込みまで行ってください。

## 困ったとき

| 症状 | 確認すること |
| --- | --- |
| ブックマークを押しても変化がない | URL欄にコード全体が入り、先頭に `javascript:` が残っているか確認してください。 |
| Tampermonkey版が動かない | スクリプトが有効か、URLが `https://tenbin.ai/workspace*` に一致するか、拡張機能の実行許可があるかを確認してください。 |
| ページを開いてもUIが残る | 現行の自動処理は `load` イベントとDOMの変化を契機に動きます。登録時点ですでに読み込みが完了し、その後DOMに変化がない場合は、処理されないことがあります。 |
| スクロールできない・画面が見切れる | ページ全体に `overflow: hidden` を設定する仕様です。いったん元の表示に戻してください。 |
| サイトの更新後にUIが消えなくなった | 対象のクラス名やページ構造が変更されている可能性があります。 |

## ファイル構成

```text
GMOCleaner/
├── Bookmark.js   # ブックマークのURL欄に登録するコード
├── normal.js     # Tampermonkey用ユーザースクリプト
└── README.md     # 概要・導入手順
```

表示位置を調整する場合は、使用するスクリプトの `marginTop = '-28px'` を変更してください。ブックマークレット版は登録済みのURL、Tampermonkey版はエディター内のコードを更新する必要があります。
