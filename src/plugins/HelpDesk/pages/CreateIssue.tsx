import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
	Select,
	FormControl,
	Grid,
	MenuItem,
	TextField,
	Typography,
} from '@material-ui/core';
import {
	Editor,
	IconButton,
} from '@nvdunginest/emis-mui';

import {
	alertActions,
	loadingActions,
	alertMessage,
	AppDispatch,
} from '../../../core';

import issueService, { AddIssueModel } from '../services/issue';
import moduleService, { ModuleModel } from '../services/module';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		[theme.breakpoints.down('sm')]: {
			padding: theme.spacing(1),
		},
	},
	formControl: {
		margin: 0,
		marginBottom: theme.spacing(1.5),
	},
	title: {
		fontWeight: 'bold',
	},
	description: {
		fontStyle: 'italic',
	},
	menuItem: {
		paddingTop: theme.spacing(0.5),
		paddingBottom: theme.spacing(0.5),
	},
}));

const initialState: AddIssueModel = {
	moduleId: 0,
	title: '',
	content: '',
	priority: 1,
	severity: 1,
}

export default function CreateIssuePage(): JSX.Element {
	const classes = useStyles();
	const history = useHistory();
	const dispatch: AppDispatch = useDispatch();

	const [state, setState] = React.useState<AddIssueModel>(initialState);
	const [modules, setModules] = React.useState<ModuleModel[]>([]);

	const handleSubmit = async () => {
		dispatch(loadingActions.show());
		try {
			const issueId = await issueService.create(state);
			dispatch(alertActions.show(alertMessage.ACTION_SUCCESS, 'success'));
			history.push(`/help-desk/issues/${issueId}`);
		}
		catch {
			dispatch(alertActions.show(alertMessage.ACTION_FAILURE, 'error'));
		}
		finally {
			dispatch(loadingActions.hide());
		}
	}

	const refresh = async () => {
		dispatch(loadingActions.show());
		try {
			setModules(await moduleService.getAll());
		}
		catch {
			dispatch(alertActions.show(alertMessage.FETCH_FAILURE, 'error'));
		}
		finally {
			dispatch(loadingActions.hide());
		}
	}

	React.useEffect(() => {
		refresh();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className={classes.root}>
			<Grid container>
				<Grid item xs={12}>
					<Typography variant="subtitle1">Ch???n module*</Typography>
					<FormControl fullWidth size="small" variant="outlined" className={classes.formControl}>
						<Select
							labelId="moduleId-label"
							margin="dense"
							id="moduleId"
							name="moduleId"
							fullWidth
							value={state.moduleId}
							onChange={(event) => { setState({ ...state, moduleId: event.target.value as number }) }}
						>
							<MenuItem
								value={0}
								className={classes.menuItem}
							>
								<div style={{ display: 'flex', flexDirection: 'column' }}>
									<Typography variant="body2" className={classes.title}>
										{`[Nh??m] - Ch???n module`}
									</Typography>
									<Typography variant="caption" className={classes.description}>
										Ch???n module c???n h??? tr???.
									</Typography>
								</div>
							</MenuItem>
							{modules.map((m, index) => (
								<MenuItem
									key={index}
									value={m.id}
									className={classes.menuItem}
								>
									<div style={{ display: 'flex', flexDirection: 'column' }}>
										<Typography variant="body2" className={classes.title}>
											{`[${m.category}] - ${m.name}`}
										</Typography>
										<Typography variant="caption" className={classes.description}>
											{m.description}
										</Typography>
									</div>
								</MenuItem>
							))}
						</Select>
					</FormControl>

					<Typography variant="subtitle1">Ti??u ?????*</Typography>
					<TextField
						margin="dense"
						className={classes.formControl}
						variant="outlined"
						fullWidth
						name="title"
						value={state.title}
						onChange={(event) => { setState({ ...state, title: event.target.value }); }}
					/>

					<Typography variant="subtitle1">M???c ????? l???i*</Typography>
					<FormControl fullWidth variant="outlined" className={classes.formControl}>
						<Select
							labelId="severity-label"
							margin="dense"
							id="severity"
							name="severity"
							value={state.severity}
							onChange={(event) => { setState({ ...state, severity: event.target.value as number }) }}
						>
							<MenuItem value={1}>Nh???</MenuItem>
							<MenuItem value={2}>B??nh th?????ng</MenuItem>
							<MenuItem value={3}>Nghi??m tr???ng</MenuItem>
							<MenuItem value={4}>R???t nghi??m tr???ng</MenuItem>
						</Select>
					</FormControl>

					<Typography variant="subtitle1">????? ??u ti??n*</Typography>
					<FormControl fullWidth variant="outlined" className={classes.formControl}>
						<Select
							labelId="priority-label"
							margin="dense"
							id="priority"
							name="priority"
							value={state.priority}
							onChange={(event) => { setState({ ...state, priority: event.target.value as number }) }}
						>
							<MenuItem value={1}>Th???p</MenuItem>
							<MenuItem value={2}>B??nh th?????ng</MenuItem>
							<MenuItem value={3}>Cao</MenuItem>
							<MenuItem value={4}>C???n g???p</MenuItem>
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={12} >
					<Typography variant="subtitle1">M?? t??? chi ti???t*</Typography>
					<FormControl fullWidth variant="outlined" className={classes.formControl}>
						<Editor
							value={state.content}
							onChange={(content) => { setState({ ...state, content: content }); }}
						/>
					</FormControl>
				</Grid>
				<FormControl variant="outlined" className={classes.formControl}>
					<IconButton
						icon="plus"
						variant="contained"
						color="success"
						text="T???o m???i"
						onClick={handleSubmit}
					/>
				</FormControl>
			</Grid>
		</div >
	)
}