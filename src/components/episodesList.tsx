
import { styles } from "./episodesList.styles";
import { PodcastEpisode, PodcastEpisodesList } from "../constants/types";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router";
import { msToTime } from "../utils/msToTime";
import { colors } from "../constants/colors";

// Styled components for table rows and cells, from https://mui.com/components/tables/#customized-tables
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
    fontWeight: 'bold'
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  "&:hover": {
    backgroundColor: `${colors.lighterPastelBlue} !important`
  }
}));

interface PodcastEpisodesListTable {
  episodes: PodcastEpisode[],
  podcastId: string
}

export const EpisodesList = ({ episodes, podcastId }: PodcastEpisodesListTable) => {
  const navigate = useNavigate();
  const handleRowClick = (episode: PodcastEpisode) => {
    navigate(`/podcast/${podcastId}/episode/${episode.id}`)
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={styles.tableComponent} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>
            <StyledTableCell align="right">Duration</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {episodes.map((row) => (
            <StyledTableRow role="checkbox" hover key={row.title} onClick={() => handleRowClick(row)}>
              <StyledTableCell component="th" scope="row">
                {row.title}
              </StyledTableCell>
              <StyledTableCell align="right">{new Date(row.releaseDate).toLocaleDateString()}</StyledTableCell>
              <StyledTableCell align="right">{msToTime(row.duration)}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
