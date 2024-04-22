import { toggleVisibilityArgType } from '../types'

export const toggleVisibility = ({
  id,
  setShowCurrentQuestionId,
  fetchData,
  fetchSecondQuestionData,
  fetchThirdQuestionData,
}: toggleVisibilityArgType) => {
  setShowCurrentQuestionId(id)
  switch (id) {
    case 1:
      fetchData()
      break
    case 2:
      fetchSecondQuestionData()
      break
    case 3:
      fetchThirdQuestionData()
      break
    default:
      break
  }
}

export const handleZoomIn = (
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>
) => {
  setZoomLevel((prevZoomLevel) =>
    prevZoomLevel < 1.728 ? +(prevZoomLevel * 1.2).toFixed(3) : prevZoomLevel
  )
}

export const handleZoomOut = (
  setZoomLevel: React.Dispatch<React.SetStateAction<number>>
) => {
  setZoomLevel((prevZoomLevel) =>
    prevZoomLevel > 0.833 ? +(prevZoomLevel / 1.2).toFixed(3) : prevZoomLevel
  )
}