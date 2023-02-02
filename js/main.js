let eventBus = new Vue()

Vue.component('todolist', {
    template: `
        <div class="todolist">
            <div class="header">
                <h1>Заметки</h1>
                <add-note></add-note>
            </div>
            <div class="columns">
                <div>
                    <h1>Новые</h1>
                    <column1 :column1="column1" :column2="column2"></column1>
                </div>
                <div>
                    <h1>В прогрессе</h1>
                    <column2 :column2="column2"></column2>
                </div>
                <div>
                    <h1>Выполненные</h1>
                    <column3 :column3="column3"></column3>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            column1: [],
            column2: [],
            column3: [],
        }
    },
    mounted() {
        eventBus.$on('addColumn1', card => {
            if (this.column1.length < 3){
                this.column1.push(card)
            }
        })
        eventBus.$on('addColumn2', card => {
            this.column2.push(card)
        })
        eventBus.$on('addColumn3', card => {
            this.column3.push(card)
        })
    },
})

Vue.component('column1', {
    template: `
        <div class="column">
            <div class="card" v-for="card in column1">
                <h2>{{card.name}}</h2>  
                <ul>
                    <li
                        v-for="tsk in card.task" 
                        v-if="tsk.title != null"
                        @click="tsk.completed = true"
                        @click="card.status += 1"
                        @click.prevent="changeCompleted(card)"
                        :class="{ completedTask: tsk.completed }"
                    >{{tsk.title}}</li>
                </ul>
            </div>
        </div>
    `,
    props: {
        column1: {
            type: Array,
        },
        column2: {
            type: Array,
        },
    },
    methods: {
        changeCompleted(card) {
            let allTask = 0
            for(let i = 0; i < 5; i++){
                if (card.task[i].title != null) {
                    allTask++
                }
            }
            if ((card.status / allTask) * 100 >= 50 && this.column2.length < 5) {
                eventBus.$emit('addColumn2', card)
                this.column1.splice(this.column1.indexOf(card), 1)
            }

        },
    },
})

Vue.component('column2', {
    template: `
        <div class="column">
            <div class="card" v-for="card in column2">
                <h2>{{card.name}}</h2>  
                <ul>
                    <li
                        v-for="tsk in card.task" 
                        v-if="tsk.title != null"
                        @click="tsk.completed = true"
                        @click="card.status += 1"
                        @click.prevent="changeCompleted(card)"
                        :class="{ completedTask: tsk.completed }"
                    >{{tsk.title}}</li>
                </ul>
            </div>
        </div>
    `,
    props: {
        column2: {
            type: Array,
        },
    },
    methods: {
        changeCompleted(card) {
            let allTask = 0
            for(let i = 0; i < 5; i++){
                if (card.task[i].title != null) {
                    allTask++
                }
            }
            if ((card.status / allTask) * 100 === 100) {
                eventBus.$emit('addColumn3', card)
                this.column2.splice(this.column2.indexOf(card), 1)
                card.date = new Date().toLocaleString();
            }

        }
    }
})

Vue.component('column3', {
    template: `
        <div class="column">
            <div class="card" v-for="card in column3">
                <h2>{{card.name}}</h2>  
                <ul>
                    <li
                        v-for="tsk in card.task" 
                        v-if="tsk.title != null"
                        @click="tsk.completed = true"
                        @click="card.status += 1"
                        @click.prevent="changeCompleted(card)"
                        :class="{ completedTask: tsk.completed }"
                    >{{tsk.title}}</li>
                    <p>{{ card.date }}</p>
                </ul>
            </div>
        </div>
    `,
    props: {
        column3: {
            type: Array
        }
    }
})

Vue.component('add-note', {
    template: `
        <form @submit.prevent="sendCard">
            <div class="addCardName">
                <label for="record">Название:</label>
                <input required id="record" v-model="name" placeholder="Заметка">
            </div>
            <div class="addCard">
                <div>
                    <label for="task1">Пункт 1:</label>
                    <input required id="task1" v-model="title1" placeholder="Пункт 1">
                    <label for="task2">Пункт 2:</label>
                    <input required id="task2" v-model="title2" placeholder="Пункт 2">
                    <label  for="task3">Пункт 3:</label>
                    <input required id="task3" v-model="title3" placeholder="Пункт 3">
                </div>
                <div>
                    <label for="task4">Пункт 4:</label>
                    <input id="task4" v-model="title4" placeholder="Пункт 4">
                    <label for="task5">Пункт 5:</label>
                    <input id="task5" v-model="title5" placeholder="Пункт 5">
                </div>
            </div>
            <input class="btn" type="submit" value="Добавить"> <span class="min">*от 3 пунтков</span>
        </form>
    `,
    data() {
        return {
            name: null,
            title1: null,
            title2: null,
            title3: null,
            title4: null,
            title5: null
        }
    },
    methods: {
        sendCard() {
            let card = {
                name: this.name,
                task: [
                    {title: this.title1, completed: false},
                    {title: this.title2, completed: false},
                    {title: this.title3, completed: false},
                    {title: this.title4, completed: false},
                    {title: this.title5, completed: false},
                ],
                date: null,
                status: 0,
            }
            eventBus.$emit('addColumn1', card)
            this.name = null
            this.title1 = null
            this.title2 = null
            this.title3 = null
            this.title4 = null
            this.title5 = null
        }
    },
})

let app = new Vue({
    el: '#app'
})