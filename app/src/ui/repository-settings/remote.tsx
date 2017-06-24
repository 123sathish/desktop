import * as React from 'react'
import { IRemote } from '../../models/remote'
import { Row } from '../lib/row'
import { TextBox } from '../lib/text-box'
import { LinkButton } from '../lib/link-button'
import { Octicon, OcticonSymbol } from '../octicons'
import { DialogContent, DialogError } from '../dialog'

interface IRemoteProps {
  /** The remote being shown. */
  readonly remote: IRemote

  /** The function to call when the remote URL is changed by the user. */
  readonly onRemoteUrlChanged: (url: string) => void

  /** The function to call when the user marks the repository for removal */
  readonly onRemoteRemoved: () => void

  /** A flag to confirm the remote will be removed when saving changes */
  readonly remoteDeleted: boolean
}

/** The Remote component. */
export class Remote extends React.Component<IRemoteProps, void> {
  public render() {
    const remote = this.props.remote

    if (this.props.remoteDeleted) {
    return (
      <DialogContent>
        <Row className='warning-helper-text'>
          <Octicon symbol={OcticonSymbol.alert} />
          <p>
            Removing the <strong>{remote.name}</strong> remote will affect publishing the repository
            to your remote server. Press <em>Save</em> to confirm this change.
          </p>
        </Row>
      </DialogContent>
      )
    }

    const title = `Remove the ${remote.name} remote from this repository`
    return (
      <DialogContent>
        <Row>
          <div>Primary remote repository ({remote.name})</div>
        </Row>
        <Row>
          <TextBox placeholder='Remote URL' value={remote.url} onChange={this.onChange}/>
          <LinkButton onClick={this.removeRemote} title={title}>
            <Octicon symbol={OcticonSymbol.trashcan} />
          </LinkButton>
         </Row>

         {this.renderInvalidUrlWarning()}
      </DialogContent>
    )
  }

  private renderInvalidUrlWarning() {
    const isValidPath = this.props.remote.url.length > 0

    if (isValidPath) { return null }

    return (
      <DialogError>
          You cannot create an empty remote URL.
      </DialogError>
    )
  }

  private removeRemote = () => {
    // TODO: propagate this up the chain
    this.props.onRemoteRemoved()
  }

  private onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const url = event.currentTarget.value
    this.props.onRemoteUrlChanged(url)
  }
}
