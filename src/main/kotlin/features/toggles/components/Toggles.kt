package features.toggles.components

import features.toggles.*
import mui.material.FormGroup
import react.FC
import react.Props

val Toggles = FC<Props> {
    FormGroup {
        Toggle {
            name = FOOTER_CLASS
            label = "Footer"
        }
        Toggle {
            name = META_CLASS
            label = "Meta fields"
        }
        Toggle {
            name = HIGHLIGHT_CLASS
            label = "Highlited fields"
        }
        Toggle {
            name = ISSUE_NUMBER_CLASS
            label = "Issue number"
        }
        Toggle {
            name = PARTY_MODE
            label = "Start a PARTY!"
        }
    }
}
