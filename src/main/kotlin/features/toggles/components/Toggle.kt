package features.toggles.components

import features.toggles.useToggle
import mui.material.FormControlLabel
import mui.material.Switch
import react.FC
import react.Props
import react.ReactNode
import react.create

external interface ToggleProps : Props {
    var name: String
    var label: String
}

val Toggle = FC<ToggleProps> { props ->
    val (toggle, handleChange) = useToggle(props.name)
    FormControlLabel {
        control = Switch.create {
            id = props.name
            checked = toggle
            onChange = handleChange
        }
        label = ReactNode(props.label)
    }
}
