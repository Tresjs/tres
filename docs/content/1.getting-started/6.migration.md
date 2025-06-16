---
title: Migration
description: " How to migrate your documentation from an existing Markdown
  solution to Docus"
navigation:
  icon: i-lucide-replace
---

## **Migrating to Docus**

Already using a Markdown-based solution for your documentation? Whether it’s **Docus v1**, the **Nuxt UI Pro docs template**, or another static site setup, migrating to Docus is simple and straightforward.

Docus offers a clean and maintainable solution with a single dependency: the Docus library itself. There’s no need to manage multiple .dependencies With everything built-in and maintained together, keeping your documentation up to date is easier than ever.

To migrate, just move your existing Markdown files into the `content/` directory of the Docus starter.

From there, you have two scenarios:

- **If your current docs already use Nuxt Content and the MDC syntax**, make sure the components used in your content exist in Nuxt UI. If any components are missing, you can easily create your own custom ones.
- **If you’re using standard Markdown**, you can copy your files as is. Then, enhance your documentation progressively using the [built-in components](/essentials/components) provided by Nuxt UI.

Once your content has been moved to the `content/` folder, you can go through the [configuration section](/concepts/configuration) to easily customize your app.

Docus is designed to focus on writing content, so if you're already using Markdown, you can easily switch to it.
