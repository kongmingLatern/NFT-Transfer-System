import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import InfoIcon from '../../components/icons/info'
import Mask from '../../components/mask'
import ZhIcon from '../icons/zh'
import EnIcon from '../icons/en'
import { BOARD_LOCAL_KEY, storage } from '../../utils/storage'
import styles from './index.module.css'

/**
 * 操作指南弹窗
 */
const Info: React.FC = () => {
  const { i18n, t } = useTranslation()
  const [showModal, setShowModal] = useState<boolean>(false)
  const handleChangLang = () => {
    const language = i18n.language === 'en' ? 'zh' : 'en'
    storage.set(BOARD_LOCAL_KEY, language)
    i18n.changeLanguage(language)
  }

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="fixed bottom-5 left-5 cursor-pointer"
      >
        <InfoIcon />
      </div>
      <Mask
        show={showModal}
        clickMask={() => {
          setShowModal(false)
        }}
      >
        <div className="flex flex-col bg-white rounded-2xl overflow-hidden w-7/12 py-1 px-3">
          <div className="flex items-center justify-between font-bold my-4 mx-4">
            <span className={styles.i18nBtn} onClick={handleChangLang}>
              {i18n.language === 'en' ? <EnIcon /> : <ZhIcon />}
            </span>
          </div>

          <img className="mask" src={t('info.url') || ''} />
        </div>
      </Mask>
    </>
  )
}

export default Info
