package features.chrome

import kotlinx.js.Record
import kotlinx.js.set
import kotlin.js.Promise

fun getStoredValue(name: String): Promise<dynamic> {
    return Promise { resolve, _ ->
        dependencies.chrome.storage.local.get(name) {
            resolve(it[name])
        }
    }
}

fun setStoredValue(name: String, value: Any): Promise<Unit> {
    return Promise { resolve, _ ->
        val items = Record<String, Any>()
        items[name] = value
        dependencies.chrome.storage.local.set(items) {
            resolve(Unit)
        }
    }
}
