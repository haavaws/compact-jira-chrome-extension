package features.toggles

import dom.html.HTMLInputElement
import features.chrome.setStoredValue
import react.dom.events.ChangeEvent
import react.useEffectOnce
import react.useState

fun useToggle(name: String): Pair<Boolean, (event: ChangeEvent<HTMLInputElement>, checked: Boolean) -> Unit> {
    val (toggle, setToggle) = useState(false)

    useEffectOnce {
        getStoredToggle(name).then { setToggle(it) }
    }

    return Pair(toggle) { event, _ ->
        setToggle(event.target.checked)
        setStoredValue(event.target.id, event.target.checked)
    }
}
