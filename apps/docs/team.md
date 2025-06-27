---
layout: page
title: Meet the Team
description: The TresJS ecosystem is developed and maintained by a global team.
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamPageSection,
  VPTeamMembers
} from 'vitepress/theme'
import { core, maintainers, alumni } from './_data/team'
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Meet the Team</template>
    <template #lead>
      The TresJS ecosystem is developed and maintained by a global team.
    </template>
  </VPTeamPageTitle>
  <VPTeamPageSection>
    <template #title>Core team</template>
    <template #members>
      <VPTeamMembers :members="core" />
    </template>
  </VPTeamPageSection>
  <VPTeamPageSection>
    <template #title>Maintainers</template>
    <template #members>
      <VPTeamMembers :members="maintainers" />
    </template>
  </VPTeamPageSection>
  <VPTeamPageSection>
    <template #title>Alumni</template>
    <template #lead>
      Here we honor some no-longer-active team members who have made valuable
      contributions in the past.
    </template>
    <template #members>
      <VPTeamMembers size="small" :members="alumni" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>
