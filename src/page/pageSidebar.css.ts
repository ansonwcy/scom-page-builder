import { Styles } from "@ijstech/components";

const Theme = Styles.Theme.ThemeVars;

export const categoryPanelStyle = Styles.style({
    padding: 4,
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px',
    background: '#fff',
    borderRadius: 5
})

export const categoryButtonStyle = Styles.style({
    position: 'relative',
    cursor: 'pointer',
    $nest: {
        '&:hover': {
            background: 'rgba(243, 178, 111, 0.08)',
            borderRadius: 4
        }
    }
})

export const widgetModalStyle = Styles.style({
    $nest: {
        '> div': {
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 10px 50px',
            overflow: 'hidden'
        },
        '.modal': {
            marginRight: -8,
            padding: '0.75rem',
            borderRadius: 5,
            backgroundColor: '#fff',
            overflow: 'auto'
        }
    }
})

export const widgetStyle = Styles.style({
    padding: '0.5rem 0.75rem',
    cursor: 'grab',
    opacity: 1,
    textAlign: 'center',
    transition: 'opacity .2s ease-in-out, transform 0.2s ease-in-out',
    $nest: {
        '&.is-dragging': {
            opacity: 0.7
        },
        '&:hover': {
            transform: 'scale(1.04) translateY(-4px)'
        }
    }
})