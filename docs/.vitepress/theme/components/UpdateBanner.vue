<script setup lang="ts"></script>
<template>
  <div class="update-banner">
    You are reading Tres v1 docs. Head over <a href="https://tresjs.org/">tresjs.org</a> for V2 docs.
  </div>
</template>

<style>
.update-banner {
  position: fixed;
  width: 100%;
  background-color: #94f7de;
  border-bottom: 1px solid #82dbc5;
  padding: 1rem 2rem;
  text-align: center;
  font-size: 0.875rem;
  height: 64px;
  z-index: 999;
}

.update-banner a {
  color: #377666;
  text-decoration: underline;
  font-weight: 600;
}

.VPNavBar,
.VPNav {
  background-color: white;
  top: 64px;
}

.VPSidebar {
  top: 128px !important;
}

.VPContent.has-sidebar {
  padding-top: 128px !important;
}
</style>
