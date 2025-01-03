# 226. 翻轉二元樹 (Invert Binary Tree)

- [Question link](https://leetcode.com/problems/invert-binary-tree)
- Topic: Binary Tree
- Easy

## 題目描述

給定一個二元樹的根節點，請翻轉這棵樹，並返回其根節點。

### 範例 1

![](./ibt-1.jpg)

**輸入**:
`root = [4,2,7,1,3,6,9]`

**輸出**:
`[4,7,2,9,6,3,1]`

### 範例 2

![](./ibt-2.jpg)

**輸入**:
`root = [2,1,3]`
**輸出**:
`[2,3,1]`

### 範例 3

**輸入**:
`root = []`
**輸出**:
`[]`

### **限制條件**

- 節點數量的範圍為 `[0, 100]`。
- 節點的值範圍為 `-100 <= Node.val <= 100`。

## 問題釐清

- 從範例圖示看起來像是要把整個樹狀的結構做 flip 的意思？
- 若樹的結點數為 0，則回傳 null 即可？
- 此函式是否能直接去改變傳入的 root，或需要產生一個新的 TreeNode?

## 提出測試案例

- 能通過題目中的三種範例
- 若需要產生一個新 TreeNode，需要檢查原本 root 在輸出後仍保持原樣

## 提出思路

- 檢查如果 root 為 null，則回傳 null
- 定義輸出的資料格式
- 遞迴地去跑這個 function，並以 tempNode 的方式去交換左右節點
- 回傳結果的 root

```ts
function invertTree(root: TreeNode | null): TreeNode | null {
  // check if the root is null, if yes, return null
  // declare result tree
  // recursively run invertTree function to swap left and right node
  // return result
};
```


## 實作

```ts
function invertTree(root: TreeNode | null): TreeNode | null {
    // check if the root is null, if yes, return null
    if (!root) {
        return null;
    }

    // declare result tree
    const newRoot = new TreeNode(root.val);


    // recursively run invertTree function to swap left and right node
    newRoot.left = invertTree(root.right);
    newRoot.right = invertTree(root.left);

    // return result
    return newRoot;
};
```
