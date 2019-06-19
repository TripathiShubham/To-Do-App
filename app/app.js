(function () {
    var model = {
        init: function () {
            this.data = [],
                this.index = 0
        },
        addData: function (task) {
            this.data.push({
                task: task,
                index: this.index,
                completed: false
            })
            return this.index++;
        },
        getDataByIndex: function (index) {
            for(var i=0; i<this.data.length; i++) {
                if(this.data[i].index == index) {
                    return this.data[i];
                }
            }
        },
        removeItem: function(index) {
            for(var i=0; i<this.data.length; i++) {
                if(this.data[i].index == index) {
                    this.data.splice(index, 1)
                    break;
                }
            }
        }
    }

    var controller = {
        init: function () {
            model.init();
            formView.init();
            listView.init();
        }
    }

    var formView = {
        init: function () {
            this.toDo = document.getElementById("toDo");
            document.getElementById("toDoForm").addEventListener("submit", function (e) {
                e.preventDefault();
                var index = model.addData(formView.toDo.value);
                listView.render(index);
                this.toDo.value = "";
            });
        }
    }

    var listView = {
        init: function () {
            this.list = document.getElementById("list");
        },
        render: function (index) {
            let data = model.getDataByIndex(index);
            var fragment = document.createDocumentFragment();
            var li = document.createElement("li");
            li.setAttribute("id", "task" + data.index);
            li.setAttribute("class", "task");
            li.textContent = data.task;
            var span = document.createElement("span");
            span.setAttribute("class", "removeTask");
            span.textContent = "X";
            span.addEventListener("click", (function (index) {
                return function () {
                    listView.removeItem(index);
                }
            })(data.index));
            li.appendChild(span);
            fragment.appendChild(li);
            this.list.appendChild(li);
        },
        removeItem: function(index) {
            var item = document.getElementById("task"+index);
            item.parentNode.removeChild(item);
            model.removeItem(index);
        }
    }

    controller.init();
})()