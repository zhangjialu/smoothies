<template>
<div class="edit-smoothie container" v-if="smoothie">
    <div class="card">
      <div class="card-content">
        <span class="card-title center-align blue-grey-text text-lighten-2">Edit Smoothie Recipe</span>
        <form @submit.prevent="updateSmoothie">
          <div class="field title">
            <label for="title">Smoothie Title:</label>
            <input type="text" name="title" v-model="smoothie.title">
          </div>
          <div class="field" v-for="(ingredient, index) in smoothie.ingredients" :key="index"> 
            <label for="added-ingredient">Ingredient</label>
            <input type="text" name="added-ingredient" v-model="smoothie.ingredients[index]">
            <i class="material-icons delete" @click="deleteIngredient(ingredient)">delete</i>
          </div>
          <div class="field ingredients">
            <label for="add-ingredient">Add an Ingredient:</label>
            <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngForm" v-model="another">
          </div>
          <div class="feedback" v-if="feedback">
            <p class="center-align red-text">{{ feedback }}</p>
          </div>
          <div class="field center-align">
            <button class="btn blue-grey lighten-2">Update Smoothie</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'

export default {
  name: 'EditSmoothie',
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null
    }
  },
  created() {
    let ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug)
    ref.get().then(snapshot => {
      snapshot.forEach(doc => {
        this.smoothie = doc.data()
        this.smoothie.id = doc.id
      })
    })
  },
  methods: {
    updateSmoothie() {
      if (this.smoothie.title) {
        this.feedback = null
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection('smoothies').doc(this.smoothie.id).update({
          title: this.smoothie.title,
          ingredients: this.smoothie.ingredients,
          slug: this.smoothie.slug
        }).then(() => {
          this.$router.push({ name: 'Index' })
        }).catch(err => {
          console.log(err)
        })
      }
      else {
        this.feedback = 'You must enter a smoothie title'
      }
    },
    addIngForm() {
      if (this.another) {
        this.smoothie.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      }
      else {
        this.feedback = 'You must input a value to add an ingredient'
      }
    },
    deleteIngredient(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients.filter(ingredient => {
        return ingredient != ing
      })
    }
  }
}
</script>

<style>
.edit-smoothie .card {
  margin: 60px auto;
  max-width: 600px;
}
.edit-smoothie .card-title{
  font-weight: 600;
}
.edit-smoothie .field {
  position: relative;
}
.edit-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
}
.edit-smoothie .delete:hover {
  color: #555;
  cursor: pointer;
}
</style>
