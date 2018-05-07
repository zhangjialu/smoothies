<template>
  <div class="add-smoothie container">
    <div class="card">
      <div class="card-content">
        <span class="card-title center-align blue-grey-text text-lighten-2">Add New Smoothie Recipe</span>
        <form @submit.prevent="addSmoothie">
          <div class="field title">
            <label for="title">Smoothie Title:</label>
            <input type="text" name="title" v-model="title">
          </div>
          <div class="field" v-for="(ingredient, index) in ingredients" :key="index"> 
            <label for="added-ingredient">Ingredient</label>
            <input type="text" name="added-ingredient" v-model="ingredients[index]">
            <i class="material-icons delete" @click="deleteIngredient(ingredient)">delete</i>
          </div>
          <div class="field ingredients">
            <!-- <div class="added-ingredient">
              <span class="chip" v-for="(ingredient, index) in ingredients" :key="index">
                {{ ingredient }}
                <i class="material-icons">clear</i>
              </span>
            </div> -->
            <label for="add-ingredient">Add an Ingredient:</label>
            <input type="text" name="add-ingredient" @keydown.tab.prevent="addIngForm" v-model="another">
          </div>
          <div class="feedback" v-if="feedback">
            <p class="center-align red-text">{{ feedback }}</p>
          </div>
          <div class="field center-align">
            <button class="btn blue-grey lighten-2">Add Smoothie</button>
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
  name: "AddSmoothie",
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null
    }
  },
  methods: {
    addSmoothie() {
      if (this.title) {
        this.feedback = null
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true
        })
        db.collection('smoothies').add({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug
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
        this.ingredients.push(this.another)
        this.another = null
        this.feedback = null
      }
      else {
        this.feedback = 'You must input a value to add an ingredient'
      }
    },
    deleteIngredient(ing) {
      this.ingredients = this.ingredients.filter(ingredient => {
        return ingredient != ing
      })
    }
  }
}
</script>

<style>
.add-smoothie .card {
  margin: 60px auto;
  max-width: 600px;
}
.add-smoothie .card-title{
  font-weight: 600;
}
.add-smoothie .field {
  position: relative;
}
.add-smoothie .delete {
  position: absolute;
  right: 0;
  bottom: 16px;
  color: #aaa;
}
.add-smoothie .delete:hover {
  color: #555;
  cursor: pointer;
}
/* .add-smoothie .card .card-content .ingredients .added-ingredient .chip {
  position: relative;
}
.add-smoothie .card .card-content .ingredients .added-ingredient .chip i {
  font-size: 1em;
  position: absolute;
  top: 0px;
  right: 0px;
  display: inline-block;
  border: 1px solid #555;
  border-radius: 1em;
} */
</style>
