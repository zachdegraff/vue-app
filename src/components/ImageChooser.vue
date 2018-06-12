<template>
    <div class="image-chooser">
        <div v-show="!file"
             class="image-chooser-drop"
             @drop="select"
             @drag="prevent"
             @dragstart="prevent"
             @dragend="prevent"
             @dragover="prevent"
             @dragenter="prevent"
             @dragleave="prevent"
             @click="toggle">
            <q-icon name="cloud_upload" size="30px"/>
            <div>{{title}}</div>
        </div>
        <div class="image-chooser-icon" v-if="file">
            <img :src="file.path"/>
            <q-btn round color="deep-orange" icon="close" class="image-chooser-icon-remove" @click="remove"/>
        </div>
        <input type="file" class="image-chooser-input" ref="input" @change="select"/>
    </div>
</template>
<script>
    export default {
        props: ['path'],
        data: () => {
            return {
                file: null,
                loading: false
            }
        },
        computed: {
            title() {
                if (this.loading) {
                    return 'Loading ...'
                }
                return 'Drop file here or click to upload.'
            }
        },
        created() {
            if (this.path) {
                this.file = {path: this.path}
            }
        },
        methods: {
            remove() {
                this.file = null;
                this.broadcast()
            },
            toggle() {
                this.$refs.input.click();
            },
            select(e) {
                this.prevent(e);
                let files = e.target.files || e.dataTransfer.files;
                if (!files || !files.length) {
                    return false;
                }
                this.loading = true;
                if (!files[0].type.match(/image\/(jpeg|png)/)) {
                    return alert('File must be an image')
                }
                this.load(files[0]).then(() => this.loading = false);
                this.$refs.input.value = "";
            },
            load(file) {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        file.path = e.target.result;
                        this.file = file;
                        this.broadcast();
                        resolve(file)
                    };
                    reader.readAsDataURL(file);
                });
            },
            prevent(e) {
                e.stopPropagation();
                if (e.preventDefault) {
                    return e.preventDefault();
                } else {
                    return e.returnValue = false;
                }
            },
            broadcast() {
                this.$emit('change', this.file)
            }
        }
    }
</script>
<style lang="scss">
    .image-chooser {
        background: #fff;
        overflow: hidden;
        position: relative;
    }

    .image-chooser-drop {
        border-radius: 3px;
        border: solid 1px #eee;
        cursor: pointer;
        padding: 30px;
        font-size: 20px;
        text-align: center;
        div {
            padding: 10px 0 0;
        }
    }

    .image-chooser-drop:hover {
        background-color: #f1f1f1;
    }

    .image-chooser-input {
        position: absolute;
        left: 0;
        top: 0;
        width: 0;
        height: 0;
    }

    .image-chooser-icon {
        float: left;
        position: relative;
        margin: 15px 20px 0 0;
        img {
            max-width: 350px;
            max-height: 350px;
        }
        &:nth-child(3n) {
            margin: 15px 0 0;
        }
    }

    .image-chooser-icon-remove {
        color: #fff;
        font-weight: bold;
        text-decoration: none;
        position: absolute;
        left: 50%;
        top: 50%;
        margin: -21px 0 0 -21px;
        i {
            font-size: 30px;
        }
    }
</style>