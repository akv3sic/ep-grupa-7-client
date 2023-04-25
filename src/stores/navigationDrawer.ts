import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNavigationDrawerStore = defineStore('navigationDrawer', () => {
    const isCollapsed = ref(false)

    function toggleCollapsed() {
        isCollapsed.value = !isCollapsed.value
    }
    function setCollapsed(value: boolean) {
        isCollapsed.value = value
    }

    function checkScreenSize() {
        if (window.innerWidth < 1024) {
            setCollapsed(true)
        } else {
            setCollapsed(false)
        }
    }

    return { isCollapsed, toggleCollapsed, setCollapsed, checkScreenSize }
})
