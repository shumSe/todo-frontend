import axios from 'axios'

export default class HandleApi{

    static async getAllItems(){
        const response = await axios.get('http://localhost:8080/api/todo/allTodoItems')
        console.log("API getAll" + response.data)
        return response
    }

    static async getItemById(id){
        const response = await axios.get('http://localhost:8080/api/todo/' + id)
        console.log("API getById" + response.data)
        return response
    }

    static async addItem(todoItem){
        const response = await axios.post('http://localhost:8080/api/todo/addTodoItem', todoItem)
        console.log("API addItem")

        return response
    }

    static async updateItem(id, todoItem){
        console.log("API update "+ id)
        console.log(todoItem)
        const response = await axios.put('http://localhost:8080/api/todo/'+id, todoItem)
        return response
    }

    static async deleteItem(id){
        console.log("API delete "+ id)
        const response = await axios.delete('http://localhost:8080/api/todo/'+id)
        return response
    }

    static async deleteItemList(idList){
        console.log("API DELETE SPISOK ")
        console.log({items: idList})
        const response = await axios.delete('http://localhost:8080/api/todo/items', {data:{ids: idList},})
        return response        
    }
}
