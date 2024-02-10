---
layout: page
title: Meet the Team
description: The TresJS ecosystem is develop and maintain by a global team..
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
    <template #title>Rencontrez l'équipe</template>
    <template #lead>
      L'écosystème TresJS est développé et maintenu par une équipe mondiale.
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