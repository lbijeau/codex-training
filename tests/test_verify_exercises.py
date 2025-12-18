import unittest

from scripts import verify_exercises


class TestVerifyExercises(unittest.TestCase):
    def test_manifest_validation_reports_missing_heading(self):
        root = "tests/fixtures/exercises"
        errors = verify_exercises.verify(root)
        combined = "\n".join(errors)
        self.assertIn("missing heading 'Objective'", combined)


if __name__ == "__main__":
    unittest.main()
