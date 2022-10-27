import features.toggles.components.Toggles
import kotlinx.browser.document
import react.create
import react.dom.client.createRoot

fun main() {
    val container = document.createElement("div")
    document.body!!.appendChild(container)

    val toggles = Toggles.create()
    createRoot(container).render(toggles)
}
