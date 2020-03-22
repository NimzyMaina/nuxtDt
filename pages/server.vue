<template>
  <div class="container p-4">
    <div class="row pull-right">
      <div class="col-md-8 mb-4">
        <nuxt-link to="/"  class="btn btn-warning">Back to Home<i class="d-inline material-icons float-left">keyboard_backspace</i></nuxt-link>
      </div>
      <div class="col-md-4 mb-4">
        <button class="btn btn-block btn-info" @click="update">
          Move Ashton Cox to Engineering
        </button>
      </div>
    </div>
    <table id="example2" class="table table-striped table-bordered" style="width:100%">
      <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>position</th>
        <th>office</th>
        <th>age</th>
        <th>startDate</th>
        <th>salary</th>
      </tr>
      </thead>
    </table>
  </div>
</template>

<script>
    export default {
        name: "server",
        metaInfo () {
            return {
                script: [
                    { src: "https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js", defer: true, body: true, callback: this.onScriptLoaded },
                    { src: "https://cdn.datatables.net/1.10.20/js/dataTables.bootstrap4.min.js", body: true, skip: !this.externalLoaded, },
                ],
                link: [
                    { rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons"}
                ]
            }
        },
        data() {
            return {
                dataTable: null,
                externalLoaded: false
            }
        },
        mounted() {
            console.log('table mounted');
            if(this.dataTable == null){
                this.onScriptLoaded();
            }
            this.$employeesHub.$on('employee-updated', this.onEmployeeUpdated)
        },
        methods: {
            onScriptLoaded() {
                this.externalLoaded = true;
                console.log('script loaded');
                setTimeout(()=> {
                    if(this.dataTable != null) return;
                    this.dataTable = $('#example2').DataTable({
                        "processing": true,
                        "serverSide": true,
                        "ordering": true,
                        "lengthChange": true,
                        "searchDelay": 2000,
                        "lengthMenu": [ [10, 25, 50, -1], [10, 25, 50, "All"] ],
                        "ajax": {
                            "url": "http://localhost:5010/api/employees",
                            "type": "POST",
                        },
                        "columns": [
                            { data: "id", title: "ID" },
                            { data: "name", title: "Name" },
                            { data: "position", title: "Position" },//, render: (data, type, row, meta) => this.positionFormat(data)},
                            { data: "office", title: "office" },
                            { data: "age", title: "Age" },
                            { data: "startDate", title: "Start Date" },
                            { data: "salary", title: "Salary" },
                        ]
                    });
                },300);
            },
            update() {
                let indexes = this.dataTable
                    .rows()
                    .indexes()
                    .filter(( value, index ) =>  {
                        return 'Ashton Cox' === this.dataTable.row(value).data()['name'];
                    });

                if(!indexes[0]){
                    console.log('No such item');
                    return;
                }
                // console.log(indexes[0]);

                // Get the row for indexes[0]
                let row = this.dataTable.row(indexes[0]);

                // Get the data for the row
                let data = row.data();

                // Change the position to `Engineer`
                data['position'] = 'Software Engineer';
                data['salary'] = '$256,811';
                // Update the table data and redraw the table
                row.data(data);//.draw(false);
            },
            positionFormat(position) {
                if (position === 'Junior Technical Author'){
                    position = `<span class="btn btn-primary p-2 no-bg">${position}</span>`;
                }
                else if (position === 'Software Engineer'){
                    position = `<span class="btn btn-warning p-2 no-bg">${position}</span>`;
                }
                return position = `<span class="btn btn-light p-2  no-bg">${position}</span>`;
            },
            onEmployeeUpdated(employee) {
                console.log(employee);
                let indexes = this.dataTable
                    .rows()
                    .indexes()
                    .filter(( value, index ) =>  {
                        return employee.id === this.dataTable.row(value).data()['id'];
                    });

                if(indexes.length <= 0){
                    console.log('No such item');
                    return;
                }

                // Get the row for indexes[0]
                let row = this.dataTable.row(indexes[0]);
                // Update the table data and redraw the table
                row.data(employee);//.draw(false);
            }
        },
        beforeDestroy () {
            this.$employeesHub.$off('employee-updated', this.onEmployeeUpdated)
        }
    }
</script>

<style scoped>

  span {
    background-color: transparent !important;
  }

</style>
