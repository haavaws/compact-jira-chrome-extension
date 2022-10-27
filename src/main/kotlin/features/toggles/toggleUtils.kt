package features.toggles

import features.chrome.getStoredValue
import kotlin.js.Promise

fun getStoredToggle(name: String): Promise<Boolean> {
    return Promise { resolve, reject ->
        getStoredValue(name).then<dynamic> {
            if (it is Boolean) {
                resolve(it)
            } else {
                reject(Error("Toggle with $name is not a boolean"))
            }
        }
    }
}
