<template>
  <div>
        <section id="input">
        <h1> Enter Group Information </h1>

        <label for="date"> Name: </label>
        <input type="string" v-model="groupName" id="groupName"/>

        <label for="where"> Zip Code: </label>
        <input type="string" v-model="zipCode" id="zipCode"/>

        <label for="category"> Friend: </label>
        <select v-model="friend" id="category">
        <option v-for="(c,pos) in allAccounts" :value="allAccounts[pos]" :key="pos">{{allAccounts[pos]}}</option>
        </select>
        
        <button v-on:click="addGroup"> Submit </button>
      </section>
    
  </div>
</template>



<!---------------------------------------------Script------------------------------------------------------------------>
<script lang="ts">
import { Component,  Vue} from 'vue-property-decorator';
import { FirebaseFirestore, QueryDocumentSnapshot, QuerySnapshot } from "@firebase/firestore-types"
import { FirebaseAuth } from "@firebase/auth-types";

@Component({
    components: {
        
    }
})

export default class CreateGroup extends Vue {
readonly $appDB!: FirebaseFirestore;
readonly $appAuth!: FirebaseAuth

groupName = "";
zipCode = ""; 
friend = ""; 
allAccounts : string[] = []; 

mounted(): void{
  this.$appDB
  .collection('/users')
  .onSnapshot((qs: QuerySnapshot) => {
    this.allAccounts.splice(0);
    qs.forEach((qds: QueryDocumentSnapshot) => {
      if(qds.exists){
        const userData = qds.data();
        if(userData.userEmail != this.$appAuth.currentUser?.email){
          this.allAccounts.push(userData.userEmail)
        }
      }
    })
  });
}

addGroup(): void{
  console.log("Added");
}
}

</script>
<!---------------------------------------------Script------------------------------------------------------------------>



<style scoped>

</style>