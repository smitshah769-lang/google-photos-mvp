import { useEffect, useState } from 'react'
import { AskPhotosHome } from '@/components/AskPhotosHome'
import { ClassifyingScreen } from '@/components/ClassifyingScreen'
import { ClarifierCard } from '@/components/ClarifierCard'
import { FallbackScreen } from '@/components/FallbackScreen'
import { PhotoViewer } from '@/components/PhotoViewer'
import { ResultsGrid } from '@/components/ResultsGrid'
import { SuccessScreen } from '@/components/SuccessScreen'
import { Toast } from '@/components/Toast'
import { useFlowStore } from '@/state/flowStore'

export function FlowApp() {
  const stage = useFlowStore((s) => s.stage)
  const submitQuery = useFlowStore((s) => s.submitQuery)
  const classifyLock = useFlowStore((s) => s.classifyLock)
  const [queryDraft, setQueryDraft] = useState('')
  const [clarifierEntry, setClarifierEntry] = useState(false)

  useEffect(() => {
    if (stage === 'HOME') {
      setQueryDraft('')
      setClarifierEntry(false)
    }
  }, [stage])

  const submitFromHome = (text: string) => {
    if (!clarifierEntry) return
    const trimmed = text.trim()
    if (!trimmed || classifyLock) return
    void submitQuery(trimmed)
  }

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <Toast />
      {stage === 'HOME' ? (
        <AskPhotosHome
          queryDraft={queryDraft}
          clarifierEntry={clarifierEntry}
          onQueryChange={setQueryDraft}
          onClarifierEntryChange={setClarifierEntry}
          onSubmitQuery={submitFromHome}
          onPickQuery={(text) => {
            setClarifierEntry(true)
            setQueryDraft(text)
          }}
        />
      ) : null}
      {stage === 'CLASSIFYING' ? <ClassifyingScreen /> : null}
      {stage === 'SEARCHING' ? <ClassifyingScreen message="Searching your library…" /> : null}
      {stage === 'LEVEL1' || stage === 'LEVEL2' || stage === 'LEVEL3' || stage === 'LOOPBACK' ? (
        <ClarifierCard />
      ) : null}
      {stage === 'RESULTS' || stage === 'VIEWER' ? (
        <>
          <ResultsGrid hidden={stage === 'VIEWER'} />
          {stage === 'VIEWER' ? <PhotoViewer /> : null}
        </>
      ) : null}
      {stage === 'SUCCESS' ? <SuccessScreen /> : null}
      {stage === 'FALLBACK' ? <FallbackScreen /> : null}
    </div>
  )
}
