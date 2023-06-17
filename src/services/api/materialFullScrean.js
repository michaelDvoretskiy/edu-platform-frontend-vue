import {computed, ref} from 'vue'

const materialName = ref('')

export function useMaterialFullScreen() {
  const showElements = computed(() => materialName.value == '')

  return {materialName, showElements}
}