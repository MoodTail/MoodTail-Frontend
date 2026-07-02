import { useState } from 'react'
import historyIcon from '../../assets/icons/history.svg'
import historyActiveIcon from '../../assets/icons/history-active.svg'
import dictionaryIcon from '../../assets/icons/dictionary.svg'
import dictionaryActiveIcon from '../../assets/icons/dictionary-active.svg'
import homeIcon from '../../assets/icons/home.svg'
import homeActiveIcon from '../../assets/icons/home-active.svg'
import recipeIcon from '../../assets/icons/recipe.svg'
import recipeActiveIcon from '../../assets/icons/recipe-active.svg'
import mypageIcon from '../../assets/icons/mypage.svg'
import mypageActiveIcon from '../../assets/icons/mypage-active.svg'
import '../../styles/BottomNav.css'

type NavKey = 'history' | 'dictionary' | 'home' | 'recipe' | 'mypage'

const navItems = [
  {
    key: 'history',
    label: '히스토리',
    icon: historyIcon,
    activeIcon: historyActiveIcon,
  },
  {
    key: 'dictionary',
    label: '도감',
    icon: dictionaryIcon,
    activeIcon: dictionaryActiveIcon,
  },
  {
    key: 'home',
    label: '홈',
    icon: homeIcon,
    activeIcon: homeActiveIcon,
  },
  {
    key: 'recipe',
    label: '레시피',
    icon: recipeIcon,
    activeIcon: recipeActiveIcon,
  },
  {
    key: 'mypage',
    label: '마이페이지',
    icon: mypageIcon,
    activeIcon: mypageActiveIcon,
  },
] as const

function BottomNav() {
  const [activeMenu, setActiveMenu] = useState<NavKey>('home')

  return (
    <nav className="bottom-nav" aria-label="하단 메뉴">
      <div className="bottom-nav__list">
        {navItems.map((item) => {
          const isActive = activeMenu === item.key

          return (
            <button
              key={item.key}
              type="button"
              className={`bottom-nav__item ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveMenu(item.key)}
            >
              <img
                className="bottom-nav__icon"
                src={isActive ? item.activeIcon : item.icon}
                alt=""
              />
              <span className="bottom-nav__label">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}

export default BottomNav