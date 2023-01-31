let eventBus = new Vue()
Vue.component('add-note', {
    template: `
        <form @submit.prevent="sendCard">
            <p>
                <label for="record">Название:</label>
                <input required id="record" v-model="name" placeholder="Заметка">
            </p>
            <p>
                <label for="task1">Пункт 1:</label>
                <input required id="task1" v-model="task1" placeholder="Пункт 1">
                <label for="task2">Пункт 2:</label>
                <input required id="task2" v-model="task2" placeholder="Пункт 2">
                <label for="task3">Пункт 3:</label>
                <input required id="task3" v-model="task3" placeholder="Пункт 3">
                <label for="task4">Пункт 4:</label>
                <input id="task4" v-model="task4" placeholder="Пункт 4">
                <label for="task5">Пункт 5:</label>
                <input id="task5" v-model="task5" placeholder="Пункт 5">
            </p>
            <input type="submit" value="Добавить">
        </form>
    `,
    data() {
        return {
            name: null,
            task1: null,
            task2: null,
            task3: null,
            task4: null,
            task5: null,
        }
    },
    methods: {
        sendCard() {
            let card = {
                name: this.name,
                task: [this.task1, this.task2, this.task3, this.task4, this.task5],
                data: null,
                status: 0,
            }
            eventBus.$emit('notes', card)
            this.name = null
            this.task = null
            this.task1 = null
            this.task2 = null
            this.task3 = null
            this.task4 = null
            this.task5 = null
            console.log(card)
        }
    },
    props: {
        column1: {
            type: Array
        },
    }
})

Vue.component('column', {
    template: `
        <div class="column">
            <div v-for="card in column1">
                <p>{{card.name}}</p>
                <ul v-if="card.task[0] != null">
                    <li >{{card.task[0]}}</li>
                    <li>{{card.task[1]}}</li>
                    <li>{{card.task[2]}}</li>
                    <li v-if="card.task[3] != null">{{card.task[3]}}</li>
                    <li v-if="card.task[4] != null">{{card.task[4]}}</li>
                </ul>
            </div>
        </div>
    `,
    props: {
        column1: {
            type: Array,
        }
    }
})

Vue.component('notes', {
    template: `
        <div class="notes">
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
        eventBus.$on('notes', card => {
            if (this.column1.length < 3){
                this.column1.push(card)
            }
        })
    },
})

let app = new Vue({
    el: '#app'
})