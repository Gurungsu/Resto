<template>
  <div>
    <router-link to="/Group" replace>Search Function</router-link>
    
  </div>
</template>



<!---------------------------------------------Script------------------------------------------------------------------>
<script lang="ts">
import { Component,  Vue} from 'vue-property-decorator';
import { FirebaseFirestore } from "@firebase/firestore-types"
import { FirebaseAuth } from "@firebase/auth-types";

@Component({
    components: {
        
    }
})

export default class nav extends Vue {
readonly $appDB!: FirebaseFirestore;
readonly $appAuth!: FirebaseAuth

}

</script>
<!---------------------------------------------Script------------------------------------------------------------------>



<style scoped>

</style>