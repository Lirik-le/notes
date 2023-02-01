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
                    <h1>Столбец 1</h1>
                    <column :column1="column1"></column>
                </div>
                <div>
                    <h1>Столбец 2</h1>
                </div>
                <div>
                    <h1>Столбец 3</h1>
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
        eventBus.$on('todolist', card => {
            if (this.column1.length < 3){
                this.column1.push(card)
            }
        })
    },
})

Vue.component('column', {
    template: `
        <div class="column">
            <div v-for="card in column1">
                
            </div>
        </div>
    `,
    props: {
        column1: {
            type: Array,
        }
    },
    methods: {

    }
})

Vue.component('card', {
    template: `
        <h2>{{card.name}}</h2>
        <ul>
            <li
                :class="{completedTask: tsk.completed}"
                v-if="tsk.title != null"
                @click="tsk.completed = true"
            >{{t.title}}</li>
            <card :card="card" v-for="tsk in card"></card>
        </ul>
        
    `,
    props: {
        tsk: {
            type: Object,
            required: true
        }
    }
})

Vue.component('add-note', {
    template: `
        <form @submit.prevent="sendCard">
            <p>
                <label for="record">Название:</label>
                <input required id="record" v-model="name" placeholder="Заметка">
            </p>
            <p>
                <label for="task1">Пункт 1:</label>
                <input required id="task1" v-model="title1" placeholder="Пункт 1">
                <label for="task2">Пункт 2:</label>
                <input required id="task2" v-model="title2" placeholder="Пункт 2">
                <label for="task3">Пункт 3:</label>
                <input required id="task3" v-model="title3" placeholder="Пункт 3">
                <label for="task4">Пункт 4:</label>
                <input id="task4" v-model="title4" placeholder="Пункт 4">
                <label for="task5">Пункт 5:</label>
                <input id="task5" v-model="title5" placeholder="Пункт 5">
            </p>
            <input type="submit" value="Добавить">
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
                data: null,
                status: 0,
            }
            eventBus.$emit('todolist', card)
            this.name = null
            this.title1 = null
            this.title2 = null
            this.title3 = null
            this.title4 = null
            this.title5 = null
            console.log(card)
        }
    },
    props: {
        column1: {
            type: Array
        },
    }
})

let app = new Vue({
    el: '#app'
})