import React from 'react'
import { FormTextField, FormSelectField } from '@components/index'
import { attributes, positions, rarities, teams } from '@constants/index'
import find from 'lodash/find'

type CardFormProps = {
  handleOnChange: any
  cardData: Card | CardRequest
  formDisabled: boolean
}

const CardForm = ({
  handleOnChange,
  cardData,
  formDisabled,
}: CardFormProps) => (
  <>
    <FormTextField
      label={'Player Name'}
      value={cardData.player_name}
      disabled={formDisabled}
      onChange={(event) => {
        handleOnChange({
          ...cardData,
          player_name: event.target.value,
        })
      }}
    />
    <FormTextField
      label={'Player ID'}
      value={cardData.playerID}
      disabled={formDisabled}
      onChange={(event) => {
        handleOnChange({
          ...cardData,
          playerID: event.target.value,
        })
      }}
    />
    <FormSelectField
      label={'Team'}
      labelId={'team-label'}
      value={cardData.teamID}
      options={teams.map((team) => {
        return { label: team.label, value: team.teamID }
      })}
      disabled={formDisabled}
      onChange={(event) => {
        handleOnChange({
          ...cardData,
          teamID: event.target.value,
        })
      }}
    />
    <FormSelectField
      label={'Rarity'}
      labelId={'rarity-label'}
      value={cardData.card_rarity}
      options={rarities.map((rarity) => {
        return { label: rarity.label, value: rarity.value }
      })}
      disabled={formDisabled}
      onChange={(event) => {
        handleOnChange({
          ...cardData,
          card_rarity: event.target.value,
        })
      }}
    />
    <FormSelectField
      label={'Position'}
      labelId={'position-label'}
      value={cardData.position}
      options={positions.map((position) => {
        return { label: position.label, value: position.value }
      })}
      disabled={formDisabled}
      onChange={(event) => {
        handleOnChange({
          ...cardData,
          position: event.target.value,
        })
      }}
    />
    <FormTextField
      type={'number'}
      inputProps={{ min: 0, max: 99 }}
      label={'Overall'}
      value={cardData.overall}
      disabled={formDisabled}
      onChange={(event) => {
        handleOnChange({
          ...cardData,
          overall: event.target.value,
        })
      }}
    />
    {cardData.position !== 'G' ? (
      <>
        <FormTextField
          type={'number'}
          inputProps={{ min: 0, max: 20 }}
          label={attributes.Skater.Skating}
          value={cardData.skating}
          disabled={formDisabled}
          onChange={(event) => {
            handleOnChange({
              ...cardData,
              skating: event.target.value,
            })
          }}
        />
        <FormTextField
          type={'number'}
          inputProps={{ min: 0, max: 20 }}
          label={attributes.Skater.Shooting}
          value={cardData.shooting}
          disabled={formDisabled}
          onChange={(event) => {
            handleOnChange({
              ...cardData,
              shooting: event.target.value,
            })
          }}
        />
        <FormTextField
          type={'number'}
          inputProps={{ min: 0, max: 20 }}
          label={attributes.Skater.Hands}
          value={cardData.hands}
          disabled={formDisabled}
          onChange={(event) => {
            handleOnChange({
              ...cardData,
              hands: event.target.value,
            })
          }}
        />
        <FormTextField
          type={'number'}
          inputProps={{ min: 0, max: 20 }}
          label={attributes.Skater.Checking}
          value={cardData.checking}
          disabled={formDisabled}
          onChange={(event) => {
            handleOnChange({
              ...cardData,
              checking: event.target.value,
            })
          }}
        />
        <FormTextField
          type={'number'}
          inputProps={{ min: 0, max: 20 }}
          label={attributes.Skater.Defense}
          value={cardData.defense}
          disabled={formDisabled}
          onChange={(event) => {
            handleOnChange({
              ...cardData,
              defense: event.target.value,
            })
          }}
        />
      </>
    ) : (
      <>
        <FormTextField
          type={'number'}
          inputProps={{ min: 0, max: 20 }}
          label={attributes.Goalie.HighShots}
          value={cardData.high_shots}
          disabled={formDisabled}
          onChange={(event) => {
            handleOnChange({
              ...cardData,
              high_shots: event.target.value,
            })
          }}
        />
        <FormTextField
          type={'number'}
          inputProps={{ min: 0, max: 20 }}
          label={attributes.Goalie.LowShots}
          value={cardData.low_shots}
          disabled={formDisabled}
          onChange={(event) => {
            handleOnChange({
              ...cardData,
              low_shots: event.target.value,
            })
          }}
        />
        <FormTextField
          type={'number'}
          inputProps={{ min: 0, max: 20 }}
          label={attributes.Goalie.Quickness}
          value={cardData.quickness}
          disabled={formDisabled}
          onChange={(event) => {
            handleOnChange({
              ...cardData,
              quickness: event.target.value,
            })
          }}
        />
        <FormTextField
          type={'number'}
          inputProps={{ min: 0, max: 20 }}
          label={attributes.Goalie.Control}
          value={cardData.control}
          disabled={formDisabled}
          onChange={(event) => {
            handleOnChange({
              ...cardData,
              control: event.target.value,
            })
          }}
        />
        <FormTextField
          type={'number'}
          inputProps={{ min: 0, max: 20 }}
          label={attributes.Goalie.Conditioning}
          value={cardData.conditioning}
          disabled={formDisabled}
          onChange={(event) => {
            handleOnChange({
              ...cardData,
              conditioning: event.target.value,
            })
          }}
        />
      </>
    )}
  </>
)

export default CardForm