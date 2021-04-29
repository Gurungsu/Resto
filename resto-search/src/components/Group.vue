<template>
  <div id="top"> 
      <h1>Group function </h1>

      
     </div>   
       
</template>

<script lang="ts">
import { Vue} from "vue-property-decorator";
import { FirebaseFirestore } from "@firebase/firestore-types";
import { FirebaseAuth } from "@firebase/auth-types";



export default class Group extends Vue {
  readonly $appAuth!: FirebaseAuth;
  readonly $appDB!: FirebaseFirestore;
}
</script>

<style scoped>

</style>