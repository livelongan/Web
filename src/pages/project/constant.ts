import { ProjectType } from '../../models'

export const InitDetails: ProjectType = {
    sid: 0,
    projectID: '',
    projectDesc: '',
    projectDetail: '',
    peopleNumber: 0,
    expenditure: 0,
    isSendEmail: false,
    projectStartDate: null,
    projectEndDate: null,
    projectStatus: {
        code: `Code1`,
        description: `Description1`,
    },
    projectStatus2: {
        code: `Code1`,
        description: `Description1`,
    },
}
