import React, { useRef } from 'react'
import twitterImg from 'assets/images/ok-swap/twitter.png'
import githubImg from 'assets/images/ok-swap/github.png'
import mImg from 'assets/images/ok-swap/m.png'
import teleImg from 'assets/images/ok-swap/tele.png'
// import selectImg from 'assets/images/ok-swap/select.png'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { FooterContent, ToolCopy, ContactLinks } from './styled'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'

export default function Footer() {
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.MENU)
  const toggle = useToggleModal(ApplicationModal.MENU)
  useOnClickOutside(node, open ? toggle : undefined)
  // const panelList = [
  //     {
  //         href: '',
  //         text: '上币申请'
  //     },
  //     {
  //         href: '',
  //         text: 'Dapp申请'
  //     },
  //     {
  //         href: '',
  //         text: '投票(未开放)'
  //     },
  //     {
  //         href: '',
  //         text: '白皮书'
  //     }
  // ]

  return (
    <>
      <FooterContent>
        <ToolCopy className="tool-copy" ref={node as any}>
          {/* <div className="tool" onClick={toggle}>
                        Tools
                        <img src={selectImg} alt="" title="arrow" />
                        {
                            open && (
                                <ul>
                                    {
                                        panelList.map((item: any, index: any) => {
                                            return (
                                                <li key={index}>
                                                    <a href={item.href}>{item.text}</a>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            )
                        }
                    </div> */}
          <div className="copy">Copyright © 2021 Waltonchain-swap Team Foundation Ltd. All rights reserved.</div>
        </ToolCopy>
        <ContactLinks className="contact-links">
          <a href="https://twitter.com/WSwapOffical">
            <img src={twitterImg} alt="" />
          </a>
          <a href="https://t.me/WSwapOfficial">
            <img src={teleImg} alt="" />
          </a>
          <a href="https://github.com/wswap-cool">
            <img src={githubImg} alt="" />
          </a>
          <a href="https://medium.com/@WSwapOffical">
            <img src={mImg} alt="" />
          </a>
        </ContactLinks>
      </FooterContent>
    </>
  )
}
