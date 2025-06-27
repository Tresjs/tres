---
layout: page
title: 认识团队
description: TresJS 生态系统由一个国际化的团队负责开发和维护。
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamPageSection,
  VPTeamMembers
} from 'vitepress/theme'
import { core } from '../_data/team'
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>认识团队</template>
    <template #lead>
      TresJS 生态系统由一个国际化的团队负责开发和维护。
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers :members="core" />
  <!-- <VPTeamPageSection>
    <template #title>Team Emeriti</template>
    <template #lead>
      Here we honor some no-longer-active team members who have made valuable
      contributions in the past.
    </template>
    <template #members>
      <VPTeamMembers size="small" :members="emeriti" />
    </template>
  </VPTeamPageSection> -->
</VPTeamPage>
