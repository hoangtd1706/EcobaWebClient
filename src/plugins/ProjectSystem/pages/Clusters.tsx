import React from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Grid,
	Typography,
	colors,
} from '@material-ui/core';
import {
	FormDialog,
	TextField,
	IconButton,
	UploadButton,
	DownloadButton,
} from '@nvdunginest/emis-mui';

import {
	alertActions,
	loadingActions,
	alertMessage,
	AppDispatch,
} from '../../../core';

import ProjectComboBox from '../components/ProjectsComboBox';

import {
	ProjectModel,
} from '../services/project';

import {
	versionNumberEnum,
	AddFromExcelModel,
} from '../services/common';

import clusterService, {
	ClusterViewModel,
	ClusterModel,
} from '../services/cluster';

const useStyles = makeStyles({
	root: {
		width: '100%',
		height: '100%',
	},
	container: {
		maxHeight: 'calc(100% - 120px)',
		overflowY: 'scroll',
	},
	cell: {
		fontSize: '0.75rem',
	},
});

const initialState: ClusterModel = {
	code: '',
	description: '',
	note: '',
	projectCode: '',
	filePath: '',
	versionNumber: versionNumberEnum.PACK,
}

export default function Clusters(): JSX.Element {
	const classes = useStyles();
	const dispatch: AppDispatch = useDispatch();
	const [showForm, setShowForm] = React.useState(false);
	const [isEdit, setIsEdit] = React.useState(false);

	const [selectedProject, setSelectedProject] = React.useState<ProjectModel | null>(null);

	const [clusters, setClusters] = React.useState<ClusterViewModel[]>([]);
	const [item, setItem] = React.useState<ClusterModel>(initialState);

	const [displayClusters, setDisplayClusters] = React.useState<ClusterViewModel[]>([]);

	const [selectedList, setSelectedList] = React.useState<string[]>([]);

	const [showAddExcelResult, setShowAddExcelResult] = React.useState(false);
	const [addExcelResult, setAddExcelResult] = React.useState<AddFromExcelModel<ClusterModel>[]>([]);

	const [keyWord, setKeyWord] = React.useState<string>('');

	const [showConfirmDelete, setShowConfirmDelete] = React.useState(false);

	const handleSubmitDelete = async () => {
		setShowConfirmDelete(false);
		if (selectedProject !== null) {
			dispatch(loadingActions.show());
			try {
				await clusterService.remove(selectedProject.code, selectedList);
				handleRefresh();
				setSelectedList([]);
				dispatch(alertActions.show(alertMessage.ACTION_SUCCESS, 'success'));
			}
			catch {
				dispatch(alertActions.show(alertMessage.ACTION_FAILURE, 'error'));
				dispatch(loadingActions.hide());
			}
		}
	}

	const handleCloseExcelResult = () => {
		setShowAddExcelResult(false);
	};

	const handleSubmitUploadForm = async (files: File[]) => {
		if (files.length >= 1 && selectedProject !== null) {
			setAddExcelResult([]);
			dispatch(loadingActions.show());
			try {
				setAddExcelResult(await clusterService.addFromExcel(selectedProject.code, files[0]));
				handleRefresh();
				setShowAddExcelResult(true);
			}
			catch {
				dispatch(loadingActions.hide());
				dispatch(alertActions.show(alertMessage.ACTION_FAILURE, 'error'));
			}
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setItem({ ...item, [event.target.name]: event.target.value });
	};

	const handleCloseForm = () => {
		setShowForm(false);
	};

	const handleOpenCreateForm = () => {
		setItem(initialState);
		setIsEdit(false);
		setShowForm(true);
	};

	const handleOpenEditForm = (item: ClusterModel) => {
		setItem(item);
		setIsEdit(true);
		setShowForm(true);
	};

	const handleSubmit = async () => {
		setShowForm(false);
		if (selectedProject !== null) {
			dispatch(loadingActions.show());
			try {
				if (isEdit) {
					await clusterService.edit(selectedProject.code, item.code, item);
				}
				else {
					if (selectedProject !== null) {
						item.projectCode = selectedProject.code;
						await clusterService.create(selectedProject.code, item);
					}
				}
				dispatch(alertActions.show(alertMessage.ACTION_SUCCESS, 'success'));
				handleRefresh();
			}
			catch {
				dispatch(alertActions.show(alertMessage.ACTION_FAILURE, 'error'));
				dispatch(loadingActions.hide());
			}
		}
	};

	const handleProjectChange = (value: ProjectModel) => {
		setSelectedProject(value);
	}

	const handleSelect = async (clusterCode: string) => {
		if (selectedList.includes(clusterCode)) {
			setSelectedList(selectedList.filter(x => x !== clusterCode));
		}
		else {
			setSelectedList([...selectedList, clusterCode]);
		}
	}

	const handleRefresh = async () => {
		dispatch(loadingActions.show());
		if (selectedProject !== null) {
			try {
				setClusters(await clusterService.getAll(selectedProject.code, versionNumberEnum.PACK));
			}
			catch {
				setClusters([]);
				dispatch(alertActions.show(alertMessage.FETCH_FAILURE, 'error'));
			}
		}
		else {
			setClusters([]);
		}
		dispatch(loadingActions.hide());
	}

	React.useEffect(() => {
		handleRefresh();
		setSelectedList([]);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedProject]);

	React.useEffect(() => {
		setDisplayClusters(
			clusters.filter(x => keyWord.split('|').every(k => x.description.includes(k)))
		);
	}, [clusters, keyWord]);

	return (
		<>
			<FormDialog
				open={showConfirmDelete}
				onClose={() => { setShowConfirmDelete(false) }}
				onSubmit={() => { handleSubmitDelete(); }}
				title="X??c nh???n x??a c??c ??i???n h??nh"
			>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<Typography variant="body2">
							Thao t??c n??y s??? x??a c??c c??ng t??c v?? mapping c???a ??i???n h??nh ???????c ch???n. Vui l??ng ki???m tra k??? c??c ??i???n h??nh tr?????c khi x??a!
						</Typography>
					</Grid>
					{selectedList.map(s => (
						<Grid item xs={12} key={s}>
							<Typography variant="subtitle2">{s}</Typography>
						</Grid>
					))}
				</Grid>
			</FormDialog>
			<FormDialog
				open={showAddExcelResult}
				onClose={handleCloseExcelResult}
				title="K???t qu??? t???o t??? file excel"
			>
				<Grid container spacing={1}>
					{addExcelResult.map((a, index) => (
						<Grid item container spacing={1} xs={12} key={index}>
							<Grid item xs={12} md={3} style={{ color: a.isAdded ? 'green' : 'red' }}>
								<Typography variant="subtitle2">{`${a.item.code}-${a.item.description}`}</Typography>
							</Grid>
							<Grid item xs={12} md={9} style={{ color: a.isAdded ? 'green' : 'red' }}>
								<Typography variant="caption">{a.message}</Typography>
							</Grid>
						</Grid>
					))}
				</Grid>
			</FormDialog>
			<FormDialog
				title="Th??m/Ch???nh s???a"
				open={showForm}
				onClose={handleCloseForm}
				onSubmit={handleSubmit}
			>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<TextField
							name="code"
							label="M??"
							type="text"
							required
							value={item.code}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							name="description"
							label="Di???n gi???i"
							type="text"
							required
							value={item.description}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							name="note"
							label="Ghi ch??"
							type="text"
							required
							value={item.note}
							onChange={handleChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							name="filePath"
							label="File chi???t t??nh"
							type="text"
							required
							value={item.filePath}
							onChange={handleChange}
						/>
					</Grid>
				</Grid>
			</FormDialog>
			<Paper className={classes.root}>
				<Grid container>
					<Grid
						container
						item xs={12}
						style={{ padding: '8px' }}
						direction="row"
						spacing={1}
						alignItems="flex-end"
					>
						<Grid item xs={12} md={6}>
							<ProjectComboBox
								value={selectedProject}
								onChange={handleProjectChange}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<TextField
								name="keyWord"
								label="T??m ki???m"
								type="text"
								value={keyWord}
								onChange={(event) => { setKeyWord(event.target.value); }}
							/>
						</Grid>
						{selectedProject !== null && (
							<Grid container spacing={1} item xs={12} alignItems="flex-end">
								<Grid item>
									<IconButton
										tooltip="Th??m m???i"
										variant="contained"
										text="Th??m"
										icon="plus"
										color="primary"
										onClick={handleOpenCreateForm}
									/>
								</Grid>
								<Grid item>
									<UploadButton
										filesLimit={1}
										title="T???i t???p excel"
										acceptedFiles={['.xls', '.xlsx',]}
										onSubmit={handleSubmitUploadForm}
										tooltip="T???o t??? file excel"
										variant="contained"
										text="Upload Excel"
										color="primary"
									/>
								</Grid>
								<Grid item>
									<DownloadButton
										variant="contained"
										label="T???i v???"
										filename={`${selectedProject.code}_Dien hinh.xlsx`}
										url={`/api/project-system/clusters/get-excel?projectCode=${selectedProject.code}&version=${versionNumberEnum.PACK}`}
									/>
								</Grid>
								<Grid item>
									<IconButton
										tooltip="L??m m???i"
										variant="contained"
										text="L??m m???i"
										color="success"
										icon="sync-alt"
										onClick={handleRefresh}
									/>
								</Grid>
								<Grid item>
									<IconButton
										tooltip="X??a c??c ??i???n h??nh ???? ch???n"
										variant="contained"
										text="X??a"
										color="danger"
										icon="trash-alt"
										disabled={selectedList.length <= 0}
										onClick={() => { setShowConfirmDelete(true); }}
									/>
								</Grid>
							</Grid>
						)}
					</Grid>
				</Grid>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label="sticky table" size="small">
						<TableHead>
							<TableRow>
								<TableCell style={{ padding: 0, width: 16 }}></TableCell>
								<TableCell className={classes.cell} align="left">M?? ??i???n h??nh</TableCell>
								<TableCell className={classes.cell} align="left">Di???n gi???i</TableCell>
								<TableCell className={classes.cell} align="left">Ghi ch??</TableCell>
								<TableCell className={classes.cell} align="left">Chi???t t??nh</TableCell>
								<TableCell className={classes.cell} align="right">S??? l?????ng</TableCell>
								<TableCell className={classes.cell} align="right">C??ng t??c</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{displayClusters.map(cluster => (
								<TableRow key={cluster.code}
									style={{
										backgroundColor: selectedList.includes(cluster.code) ? colors.red[100] : 'initial',
									}}
								>
									<TableCell
										style={{
											padding: 0,
											width: 16,
											backgroundColor: selectedList.includes(cluster.code) ? colors.red[500] : colors.teal[100],
										}}
										onClick={() => { handleSelect(cluster.code) }}
									>
									</TableCell>
									<TableCell
										className={classes.cell}
										align="left"
										style={{
											cursor: 'pointer',
										}}
										onClick={() => {
											handleOpenEditForm(cluster);
										}}
									>
										{cluster.code}
									</TableCell>
									<TableCell className={classes.cell} align="left">{cluster.description}</TableCell>
									<TableCell className={classes.cell} align="left">{cluster.note}</TableCell>
									<TableCell className={classes.cell} align="left">
										<a
											href={cluster.filePath}
											style={{
												textDecoration: 'none',
											}}
											target="_blank"
											rel="noreferrer"
										>
											Chi???t t??nh
										</a>
									</TableCell>
									<TableCell className={classes.cell} align="right">{cluster.elementCount}</TableCell>
									<TableCell className={classes.cell} align="right">{cluster.itemCount}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</>
	);
}
