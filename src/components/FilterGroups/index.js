import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroups = props => {
  const {
    onAddEmploymentType,
    onRemoveEmploymentType,
    onChangeSalaryRange,
  } = props

  const onEmploymentTypeToggle = event => {
    if (event.target.checked === true) {
      onAddEmploymentType(event.target.id)
    } else {
      onRemoveEmploymentType(event.target.id)
    }
  }

  const onSalaryRadioToggle = event => {
    onChangeSalaryRange(event.target.id)
  }

  const renderTypesOfEmployment = () => (
    <>
      <h1 className="filters-sub-heading">Type of Employment</h1>
      <ul className="employment-list-container">
        {employmentTypesList.map(eachType => (
          <li
            className="employment-item-container"
            key={eachType.employmentTypeId}
          >
            <input
              id={`${eachType.employmentTypeId}`}
              type="checkbox"
              onChange={onEmploymentTypeToggle}
            />
            <label
              htmlFor={`${eachType.employmentTypeId}`}
              className="employment-label"
            >
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  const renderSalaryRange = () => (
    <>
      <h1 className="filters-sub-heading">Salary Range</h1>
      <ul className="salary-range-list-container">
        {salaryRangesList.map(eachRange => (
          <li
            className="salary-range-item-container"
            key={eachRange.salaryRangeId}
          >
            <input
              id={eachRange.salaryRangeId}
              type="radio"
              name="salary_range"
              onChange={onSalaryRadioToggle}
            />
            <label
              htmlFor={eachRange.salaryRangeId}
              className="salary-range-label"
            >
              {eachRange.label}
            </label>
          </li>
        ))}
      </ul>
    </>
  )

  return (
    <div className="filters-bg-container">
      {renderTypesOfEmployment()}
      <hr className="filters-split-line-hr-tag" />
      {renderSalaryRange()}
    </div>
  )
}

export default FilterGroups
