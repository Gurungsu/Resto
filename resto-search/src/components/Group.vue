<template>
  <div id="top"> 
      <h1>Group function </h1>
      <br/>
      <br/>
      <br/>
        <label for="category" border-style=solid> Your Groups: </label>
        <select v-model="friend" id="category">
        <option v-for="(c,pos) in allGroups" :value="allGroups[pos]" :key="pos">{{allGroups[pos]}}</option>
        </select>
      
     </div>   
       
</template>

<script lang="ts">
import { Vue} from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";

export default class Group extends Vue {
  readonly $appAuth!: FirebaseAuth;
  readonly $appDB!: FirebaseFirestore;
  allGroups: string[] = [];
}
</script>

<style scoped>

</style>