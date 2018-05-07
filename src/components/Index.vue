<template>
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <button class="delete btn-flat right" @click="deleteSmoothie(smoothie.id)">
        <i class="material-icons">delete</i>
      </button>
      <div class="card-content">
        <span class="card-title blue-grey-text text-lighten-2">{{ smoothie.title }}</span>
        <ul class="ingerdients">
          <li class="chip" v-for="(ing, index) in smoothie.ingredients" :key="index">{{ ing }}</li>
        </ul>
      </div>
      <div class="edit">
        <router-link :to="{ name: 'EditSmoothie', params: { smoothie_slug: smoothie.slug } }" class="btn-floating halfway-fab light-green lighten-3">
          <i class="material-icons">edit</i>
        </router-link>
      </div>
    </div>
  </div>
</template>
    
<script>
import db from '@/firebase/init'

export default {
  name: "Index",
  data() {
    return {
      smoothies: []
    }
  },
  methods: {
    deleteSmoothie(id) {
      // delete data from firestore
      db.collection('smoothies').doc(id).delete()
      .then(() => {
        this.smoothies = this.smoothies.filter(smoothie => {
          return smoothie.id !== id
        })
      })
    }
  },
  created() {
    // fetch data from firestore
    db.collection('smoothies').get()
    .then(snapshot => {
      snapshot.forEach(doc => {
        let smoothie = doc.data()
        smoothie.id = doc.id
        this.smoothies.push(smoothie)
      })
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 30px;
    margin-top: 60px;
  }
.index .card .card-title {
  font-size: 1.8em;
  font-weight: 600;
}
.index .card .delete {
  padding: 0 6px;
}
.index .card .delete:focus {
  background: transparent;
}
.index .card .delete i {
  color: #aaa;
  font-size: 1.5em;
}
.index .card .delete i:hover {
  color: #555;
}
</style>
