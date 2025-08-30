---
sidebar_position: 3
---

# GitHub 運用ルール（Branch保護 / PR必須 / CI）

## 概要

安全で効率的な開発を行うためのGitHub運用ルールを定めます。コードの品質を保ち、チーム開発を円滑に進めるための基本的なガードレールを設定します。

## ブランチ戦略

### メインブランチの保護

#### main ブランチ
- **直接push禁止**: すべての変更はPull Requestを通して行う
- **削除保護**: ブランチの削除を防止
- **管理者例外なし**: 管理者であっても保護ルールを適用

#### develop ブランチ（使用する場合）
- main ブランチと同様の保護設定
- 開発中の機能の統合ブランチとして使用

### フィーチャーブランチ運用

#### ブランチ命名規則
```
feature/機能名
fix/修正内容
hotfix/緊急修正内容
docs/文書更新内容
```

#### ブランチ管理
- 作業完了後は速やかに削除
- 長期間残存するブランチは定期的にレビュー
- mainからの定期的な更新（rebase推奨）

## Pull Request必須運用

### PR作成時のルール

#### 必須項目
- **タイトル**: わかりやすく簡潔な変更内容
- **説明**: 変更理由、影響範囲、テスト方法
- **ラベル**: 変更の種類（feature, fix, docs等）

#### レビュー要件
- **最低1名のレビュー必須**
- **全ての会話がResolveされていること**
- **CI/CDチェックがすべて通過していること**

### レビュープロセス

#### レビュー観点
- **コードの品質**: 可読性、保守性、パフォーマンス
- **設計の妥当性**: アーキテクチャとの整合性
- **テストの網羅性**: 適切なテストケースが含まれているか
- **セキュリティ**: 脆弱性の混入がないか

#### レビュー期限
- 24時間以内のレビュー開始
- 72時間以内の完了を目標

## CI/CD パイプライン

### 自動チェック項目

#### コード品質チェック
```yaml
- name: Lint Check
  run: npm run lint

- name: Type Check
  run: npm run type-check

- name: Format Check
  run: npm run format:check
```

#### テスト実行
```yaml
- name: Unit Tests
  run: npm run test:unit

- name: Integration Tests
  run: npm run test:integration

- name: E2E Tests
  run: npm run test:e2e
```

#### セキュリティスキャン
```yaml
- name: Security Audit
  run: npm audit

- name: SAST Scan
  run: npm run security:scan
```

### デプロイメント

#### ステージング環境
- PR作成時に自動デプロイ
- レビュー用の一時的な環境

#### プロダクション環境
- main ブランチへのマージ後に自動デプロイ
- Blue-Green デプロイメント方式

## Status Checks必須設定

### 必須チェック項目
- **CI Pipeline Status**: すべてのテストが通過
- **Code Coverage**: 最低80%のカバレッジ
- **Security Scan**: 脆弱性スキャン通過
- **Lint & Format**: コードフォーマット準拠

### 設定例
```json
{
  "required_status_checks": {
    "strict": true,
    "contexts": [
      "continuous-integration",
      "security-scan",
      "code-coverage",
      "lint-check"
    ]
  }
}
```

## 緊急時対応

### Hotfix プロセス
1. **main ブランチから hotfix ブランチ作成**
2. **修正内容の実装**
3. **緊急レビュー（最低1名、1時間以内）**
4. **main と develop 両方へマージ**

### エスカレーション
- 緊急度が高い場合はSlack通知
- 影響範囲が大きい場合は関係者への直接連絡

## ツール設定

### GitHub設定

#### Branch Protection Rules
```json
{
  "required_status_checks": {"strict": true},
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
```

#### Auto-merge設定
- レビュー承認後の自動マージ
- Squash merge推奨

### Webhook設定
- Slack通知連携
- 外部システムとの連携

## 運用メトリクス

### 測定指標
- **PR のリードタイム**
- **レビューコメント数**
- **CI失敗率**
- **デプロイ頻度**

### 改善アクション
- 月次での振り返り実施
- プロセス改善の提案・実施
- ツール設定の最適化

---

最終更新: 2025年8月