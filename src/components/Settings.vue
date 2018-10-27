<template>
    <section id="settings">
        <div class="col1">
            <h3>Settings</h3>
            <p>Update your profile</p>

            <transition name="fade">
                <p v-if="showSuccess" class="success">profile updated</p>
            </transition>

            <form @submit.prevent>
                <label for="name">Display Name</label>
                <input v-model.trim="displayName" type="text" :placeholder="userProfile.displayName" id="displayName" />

                <label for="title">Email</label>
                <input v-model.trim="email" type="text" :placeholder="userProfile.email" id="email" />

                <button @click="updateProfile" class="button">Update Profile</button>
            </form>
        </div>
    </section>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        data() {
            return {
                displayName: '',
                email: '',
                showSuccess: false
            }
        },
        computed: {
            ...mapGetters('users', ['userProfile'])
        },
        methods: {
            updateProfile() {
                this.$store.dispatch('users/updateProfile', {
                    displayName: this.displayName !== '' ? this.displayName : this.userProfile.displayName,
                    email: this.email !== '' ? this.email : this.userProfile.email
                })

                this.displayName = ''
                this.email = ''

                this.showSuccess = true

                setTimeout(() => { this.showSuccess = false }, 2000)
            }
        }
    }
</script>
