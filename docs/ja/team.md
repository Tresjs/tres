---
layout: page
title: チームのご紹介
description: TresJSエコシステムは、グローバル チームによって維持および開発されています
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamPageSection,
  VPTeamMembers
} from 'vitepress/theme'
import { core } from './_data/team'
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>チームのご紹介</template>
    <template #lead>
      TresJSエコシステムは、グローバル チームによって維持および開発されています。
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="core" />
  <!-- <VPTeamPageSection>
    <template #title>名誉会員</template>
    <template #lead>
      ここでは、過去に貴重な貢献をした、現在は活動を停止しているチームメンバーを讃えます。
    </template>
    <template #members>
      <VPTeamMembers size="small" :members="emeriti" />
    </template>
  </VPTeamPageSection> -->
</VPTeamPage>
