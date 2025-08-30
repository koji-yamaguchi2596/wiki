import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Manual sidebar configuration for organized structure
  tutorialSidebar: [
    {
      type: 'category',
      label: 'サービス概要（Overview）',
      items: ['overview/intro'],
      collapsed: false,
    },
    {
      type: 'category',
      label: 'プロセス（Process）',
      items: ['process/ai-driven-design-loop'],
      collapsed: false,
    },
    {
      type: 'category',
      label: '開発（Dev）',
      items: ['dev/github-guardrails'],
      collapsed: false,
    },
  ],
};

export default sidebars;
