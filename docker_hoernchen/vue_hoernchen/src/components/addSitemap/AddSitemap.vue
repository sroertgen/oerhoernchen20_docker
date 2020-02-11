<template>
    <div>
        <b-container>
            <div class="row">
                <div class="col-sm-10">
                    <h1>Sitemap hinzufügen</h1>
                    <hr><br><br>
                    <p>Bitte die URL der Sitemap eintragen:</p>
                    <b-form-input v-model="sitemap_url" placeholder="Bitte Sitemap-URL eintragen"></b-form-input>
                    <div class="mt-2">Sitemap-Url: {{ sitemap_url }}</div>
                    <b-button variant="success">Sitemap hinzufügen</b-button>
                    <br><br>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">OER-Repo</th>
                                <th scope="col">Sitemap-Url</th>
                                <th scope="col">Erfolgreich eingelesen?</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>foo</td>
                                <td>bar</td>
                                <td>foobar</td>
                                <td>
                                    <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-warning btn-sm">Update</button>
                                        <button type="button" class="btn btn-danger btn-sm">Entfernen</button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data() {
            return {
                sitemap_url: '',
                msg: 'Hello!'
            };
        },
        methods: {
            getMessage() {
                const path = 'http://localhost:5000/ping';
                axios.get(path)
                    .then((res) => {
                        this.msg = res.data;
                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.error(error);
                    });
            },
        },
        created() {
            this.getMessage();
        },
    };
</script>
