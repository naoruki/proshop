import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { FaTimes, FaTrash, FaEdit, FaCheck } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
// import { toast } from "react-toastify";
import {
	useGetUsersQuery,
	useDeleteUserMutation,
} from "../../slices/usersApiSlice";
import Swal from "sweetalert2";

const UserListScreen = () => {
	const { data: users, refetch, isLoading, error } = useGetUsersQuery();

	const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

	// const deleteHandler1 = async (id) => {
	// 	if (window.confirm("Are you sure you want to delete")) {
	// 		try {
	// 			await deleteUser(id);
	// 			toast.success("User Deleted");
	// 			refetch();
	// 		} catch (err) {
	// 			toast.error(err?.data?.message || err.message);
	// 		}
	// 	}
	// };
	const deleteHandler = async (id) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					await deleteUser(id); // Add your createProduct() function here
					refetch(); // Add your refetch() function here
					Swal.fire({
						title: "Deleted!",
						text: "Your file has been deleted.",
						icon: "success",
					});
				} catch (err) {
					Swal.fire({
						title: "Error!",
						text: err?.data?.message || err.error,
						icon: "error",
					});
				}
			}
		});
	};
	return (
		<>
			<h1>Users</h1>
			{loadingDelete && <Loader />}
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped hover responsive className="table-sm">
					<thead>
						<tr>
							<td>ID</td>
							<td>NAME</td>
							<td>EMAIL</td>
							<td>ADMIN</td>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map((user) => (
							<tr key={user._id}>
								<td>{user._id}</td>
								<td>{user.name}</td>
								<td>
									<a href={`mailto:${user.email}`}>{user.email}</a>
								</td>
								<td>
									{user.isAdmin ? (
										<FaCheck style={{ color: "green" }} />
									) : (
										<FaTimes style={{ color: "red" }} />
									)}
								</td>
								<td>
									<LinkContainer to={`/admin/user/${user._id}/edit`}>
										<Button variant="light" className="btn-sm">
											<FaEdit />
										</Button>
									</LinkContainer>
									<Button
										variant="danger"
										className="btn-sm"
										onClick={() => deleteHandler(user._id)}
									>
										<FaTrash style={{ color: "white" }} />
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default UserListScreen;
